import express from "express";
import {json} from 'body-parser';
import { currentUserRouter } from "./routes/current-user";
import { signOutRouter } from "./routes/signout";
import { signInRouter } from "./routes/signin";
import { signUpRouter } from "./routes/signup";
import { errorHandler } from "@zasfmy/commontick";
import { NotFound } from "@zasfmy/commontick";
import cookieSession from "cookie-session";

const app=express();
app.set('trust proxy',true);
app.use(json());
app.use(cookieSession({
   signed:false,
   secure:process.env.NODE_ENV!=='test'
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

export {app};