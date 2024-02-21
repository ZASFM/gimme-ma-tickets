import express from "express";
import {json} from 'body-parser';
import { NotFound, currentUser } from "@zasfmy/commontick";
import cookieSession from "cookie-session";
import { newOrderRouter } from "./routes/new";
import { showOrderRouter } from "./routes/show";
import { indexOrderRouter } from "./routes";
import { deleteOrderRouter } from "./routes/delete";

const app=express();
app.set('trust proxy',true);
app.use(json());
app.use(cookieSession({
   signed:false,
   secure:process.env.NODE_ENV!=='test'
}));

//checking that users are logged in
app.use(currentUser);
//get all my active orders
app.use(indexOrderRouter);
//get a specific order bt :orderId
app.use(showOrderRouter);
//make an order to purchase a ticket
app.use(newOrderRouter);
//delete your order
app.use(deleteOrderRouter);
//not found error
app.get('*',async(req,res,next)=>{
    next(new NotFound());
});

export {app};