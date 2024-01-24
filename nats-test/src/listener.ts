import nats, { Message } from "node-nats-streaming";
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
   const options = stan.subscriptionOptions(). 
     //setting manual acknowledgment of the events
     setManualAckMode(true);

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