import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
   validateRequest,
   NotFound,
   requireAuth,
   notAuthorized
} from '@zasfmy/commontick';
import { Ticket } from '../models/ticket';
const router=express.Router();

router.put(
   '/api/tickets:id',
   requireAuth,
   [
      body('title'). 
         not(). 
         isEmpty(). 
         withMessage('Title must be a valid string'), 
      body('price'). 
         isFloat({gt:0}). 
         withMessage('Price must be a valid numberx')
   ],
   validateRequest,
   async(req:Request, res:Response)=>{
      //ticket does not exists on db
      const ticket=await Ticket.findById(req.params.id);
      if(!ticket){
         throw new NotFound();
      }   

      if(ticket.userId!==req.currentUser?.id){
         throw new notAuthorized();
      }

      //this is only gonna save the ticket in the mongoDB memory instance
      ticket.set({
         title:req.body.title,
         price:req.body.price
      })
      //this is gonna actually persist the data in the mongoDB
      await ticket.save();

      res.send(ticket);
   }
)
   
export {
   router as UpdateTicket
}
