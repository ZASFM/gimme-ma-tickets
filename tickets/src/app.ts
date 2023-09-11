import express from "express";
import {json} from 'body-parser';
import { NotFound, currentUser } from "@zasfmy/commontick";
import cookieSession from "cookie-session";
import { createTicketRouter } from "./routes/new";
import { TicketRouter } from "./routes/show";
import { indexRouter } from "./routes";
import { UpdateTicket } from "./routes/update";

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
//show and get a defined ticket
app.use(TicketRouter);
//get all tickets
app.use(indexRouter);
//update a ticket
app.use(UpdateTicket);
//not found error
app.get('*',async(req,res,next)=>{
    next(new NotFound());
});

export {app};