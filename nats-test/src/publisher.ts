import nats from 'node-nats-streaming';
import { TickerCreatedPublisher } from './events/tickerCreatedPublisher';

//connecting nats to :4222
const stan = nats.connect("ticketing","abc",{
   url:"http://localhost:4222"
});

//on successful connection log the message
stan.on("connect",async()=>{
   console.log("Publisher connected to nats");

   const publisher = new TickerCreatedPublisher(stan);
   try{
      await publisher.publish({
         id:"123",
         title:"ticket",
         price:123
      });
   }catch(err){
      console.error(err);
   }
})