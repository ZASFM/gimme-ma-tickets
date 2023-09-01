import mongoose from "mongoose";
import { app } from "./app";

const start=async()=>{
   if(!process.env.JWT_SECRET) throw new Error('No JWT secret present inside pod secret');
   if(!process.env.MONGO_URI) throw new Error('No MONGO_URI secret present inside pod secret');

   try{
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