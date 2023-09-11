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
   async(req:Request, res:Response)=>{
      //ticket does not exists on db
      const ticket=await Ticket.findById(req.params.id);
      if(!ticket){
         throw new NotFound();
      }   

      if(ticket.userId!==req.currentUser?.id){
         throw new notAuthorized();
      }

      res.send(ticket);
   }
)
   
export {
   router as UpdateTicket
}
