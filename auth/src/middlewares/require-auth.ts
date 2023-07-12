import { Request, Response, NextFunction } from "express";
import { notAuthorized } from "../errors/not-auth";

export const requireAuth=(
   req:Request,
   res:Response,
   next:NextFunction
)=>{
   if(!req.currentUser){
      throw new notAuthorized();
   }

   next();
}