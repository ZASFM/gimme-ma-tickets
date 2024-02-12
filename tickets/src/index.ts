import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "../nats-wrapper";

const start=async()=>{
   if(!process.env.JWT_SECRET) throw new Error('No JWT secret present inside pod secret');
   if(!process.env.MONGO_URI) throw new Error('No MONGO_URI secret present inside pod secret');

   try{
      await natsWrapper.connect('ticketing','abc','http://nats-srv:4222');
      //gracefull shut
      natsWrapper.client.on("close",()=>{
         console.log('NATS connection closed');
         process.exit();
      })
      natsWrapper.client.on("SIGINT",()=>natsWrapper.client.close());
      natsWrapper.client.on("SIGTERM",()=>natsWrapper.client.close());
      await mongoose.connect(process.env.MONGO_URI);
      console.log('connected to mdb');
   }catch(err){
      console.log(err);
   }
}


app.listen(3000,()=>{ 
   console.log('auth is on 3000');
})

start();