import mongoose from "mongoose";
import { app } from "./app";

const start=async()=>{
   if(!process.env.JWT_SECRET) throw new Error('No JWT secret present inside pod secret')

   try{
      await mongoose.connect('mongodb://auth-mongo-srv:27017/tickets');
      console.log('connected to mdb');
      
   }catch(err){
      console.log(err);
   }
}

app.listen(3000,()=>{ 
   console.log('auth is on 3000');
})

start();