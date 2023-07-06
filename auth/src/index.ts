import express from "express";
import {json} from 'body-parser';
import { currentUserRouter } from "./routes/current-user";
import { signOutRouter } from "./routes/signout";
import { signInRouter } from "./routes/signin";
import { signUpRouter } from "./routes/signup";

const app=express();
app.use(json());

// current user
app.use(currentUserRouter);
// sign in
app.use(signInRouter);
// sign up
app.use(signUpRouter);
// sign out
app.use(signOutRouter);

app.listen(3000,()=>{ 
   console.log('auth is on 3000');
   
})