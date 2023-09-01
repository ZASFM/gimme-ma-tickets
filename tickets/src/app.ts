import express from "express";
import {json} from 'body-parser';
import { NotFound, currentUser } from "@zasfmy/commontick";
import cookieSession from "cookie-session";
import { createTicketRouter } from "./routes/new";

const app=express();
app.set('trust proxy',true);
app.use(json());
app.use(cookieSession({
   signed:false,
   secure:process.env.NODE_ENV!=='test'
}));

//checking that users are logged in
app.use(currentUser);
//post req, created ticket
app.use(createTicketRouter);

//not found error
app.get('*',async(req,res,next)=>{
    next(new NotFound());
});

export {app};