import express from "express";
import {json} from 'body-parser';
import { NotFound } from "@zasfmy/commontick";
import cookieSession from "cookie-session";

const app=express();
app.set('trust proxy',true);
app.use(json());
app.use(cookieSession({
   signed:false,
   secure:process.env.NODE_ENV!=='test'
}));


//not found error
app.get('*',async(req,res,next)=>{
    next(new NotFound());
});

export {app};