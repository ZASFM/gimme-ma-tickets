import nats from "node-nats-streaming";

const stan = nats.connect("ticketing","abc",{
   url:"http://localhost:4222"
});

stan.on("connect",()=>{
   console.log("Listener connected to Nats"); 
   const subscription=stan.subscribe("tickets:created");
   subscription.on("message",(msg)=>{  
      console.log(msg);
      
   })
})

