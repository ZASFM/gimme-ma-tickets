import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

const stan = nats.connect("ticketing",randomBytes(4).toString(),{
   url:"http://localhost:4222"
});

stan.on("connect",()=>{
   console.log("Listener connected to Nats"); 

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
})

