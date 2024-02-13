import { Stan } from "node-nats-streaming";

export const natsWrapper={
   client:{
      //client contains the .publish function which emit events
      publish:(subject:string, data:string, callback:()=>void)=>{
         //upon publishing an event, to do it, we run the callback that does the business logic. See the .publish functions inside base-publisher.ts 
         callback();
      }
   }
}