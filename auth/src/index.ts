import express from "express";
import {json} from 'body-parser';
import { currentUserRouter } from "./routes/current-user";
import { signOutRouter } from "./routes/signout";
import { signInRouter } from "./routes/signin";
import { signUpRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFound } from "./errors/not-found-error";
import mongoose, { trusted } from "mongoose";
import cookieSession from "cookie-session";

const app=express();
app.set('trust proxy',true);
app.use(json());
app.use(cookieSession({
   signed:false,
   secure:true
}));

// current user
app.use(currentUserRouter);
// sign in
app.use(signInRouter);
// sign up
app.use(signUpRouter);
// sign out
app.use(signOutRouter);
//error handler:
app.use(errorHandler);
//not found error
app.get('*',async(req,res,next)=>{
    next(new NotFound());
});

const start=async()=>{
   if(!process.env.JWT_SECRET) throw new Error('No JWT secret present inside pod secret')

   try{
      await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
      console.log('connected to mdb');
      
   }catch(err){
      console.log(err);
   }
}

app.listen(3000,()=>{ 
   console.log('auth is on 3000');
})

start();