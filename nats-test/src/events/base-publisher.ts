import { Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Event{
   subject: Subjects,
   data:any
}

export abstract class Publisher<T extends Event>{
   private client:Stan;
   abstract subject:T["subject"]
   
   constructor(client:Stan){
      this.client=client
   }

   //publish an event to a channel and pass data
   publish(data:T["data"]){
      this.client.publish(this.subject,data,()=>{
         console.log("event emitted");
         
      })
   }
}