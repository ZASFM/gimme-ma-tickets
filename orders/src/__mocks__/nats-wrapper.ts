import { Stan } from "node-nats-streaming";

export const natsWrapper={
   client:{
      //client contains the .publish function which emit events
      publish:jest.fn().mockImplementation((subject:string, data:string, callback:()=>void)=>{
         callback();
      })
   }
}