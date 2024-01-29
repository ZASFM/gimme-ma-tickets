import nats, { Message, Stan } from "node-nats-streaming";
import { randomBytes } from "crypto";

const stan = nats.connect("ticketing",randomBytes(4).toString(),{
   url:"http://localhost:4222"
});

stan.on("connect",()=>{
   console.log("Listener connected to Nats"); 

   //when listener is killed, exit process, so NATS, removes the lister from channel
   stan.on("close",()=>{
      console.log("Nats exiting");
      process.exit();
   })

   //config:
   const options = stan.
     subscriptionOptions(). 
     //setting manual acknowledgment of the events
     setManualAckMode(true).
     //this is how we get all the event in the past
     setDeliverAllAvailable().
     //adding listener-srv as id, so instead of getting al previous events, i only get those with listener-srv
     setDurableName("listener-srv");

   const subscription=stan.subscribe(
      //name of the channel im susbcribing to:
      "tickets:created",
      //name of the queue im subscribing to:
      "orderServiceQueueGroup",
      //options:
      options
   );
   subscription.on("message",(msg:Message)=>{  
      const data = msg.getData();
      if(typeof data==="string"){
         console.log(`Message with sequence: ${msg.getSequence()}, has message: ${data}`);
         msg.ack();
      }      
   })
});

stan.on("SIGINT",()=>stan.close());
stan.on("SIGTERM",()=>{stan.close()});

abstract class Listener{
   private client:Stan;
   abstract subject:string;
   abstract queueName: string;
   protected ackWait= 5*1000;
   abstract onMessage:(data:any, message:Message)=>void;

   constructor(client:Stan){
      this.client=client;
   }

   subscriptionOptions(){
      return this.client.
         subscriptionOptions().
         setDeliverAllAvailable(). 
         setManualAckMode(true). 
         setAckWait(this.ackWait). 
         setDurableName(this.queueName);
   }

   listen(){
      const subscription=this.client.subscribe(
         this.subject,
         this.queueName,
         this.subscriptionOptions()
      )

      subscription.on("message",(msg:Message)=>{
         console.log(`Msg recieved: ${this.subject}/${this.queueName}`);

         const parsedData=this.parseMessage(msg);
         this.onMessage(parsedData,msg);
      })
   }

   parseMessage(msg:Message){
      const data=msg.getData();
      return typeof data==="string"?
      //in case data is a string
      JSON.parse(data):
      //in case data is a buffer
      JSON.parse(data.toString("utf8"))
   }


}