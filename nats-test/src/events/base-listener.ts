import { Message, Stan } from "node-nats-streaming";

export abstract class Listener {
   private client: Stan;
   abstract subject: string;
   abstract queueName: string;
   protected ackWait = 5 * 1000;
   abstract onMessage: (data: any, message: Message) => void;
 
   constructor(client: Stan) {
     this.client = client;
   }
 
   subscriptionOptions() {
     return (
       this.client
         .subscriptionOptions()
         //setting manual acknowledgment of the events
         .setManualAckMode(true)
         //this is how we get all the event in the past
         .setDeliverAllAvailable()
         //adding listener-srv as id, so instead of getting al previous events, i only get those with listener-srv
         .setDurableName(this.queueName)
         .setAckWait(this.ackWait)
     );
   }
 
   listen() {
     const subscription = this.client.subscribe(
       //name of the channel im susbcribing to:
       this.subject,
       //name of the queue im subscribing to:
       this.queueName,
       this.subscriptionOptions()
     );
 
     subscription.on("message", (msg: Message) => {
       console.log(`Msg received: ${this.subject}/${this.queueName}`);
 
       const parsedData = this.parseMessage(msg);
       this.onMessage(parsedData, msg);
     });
   }
 
   parseMessage(msg: Message) {
     const data = msg.getData();
     return typeof data === "string"
       ? JSON.parse(data)
       : JSON.parse(data.toString("utf8"));
   }
 }