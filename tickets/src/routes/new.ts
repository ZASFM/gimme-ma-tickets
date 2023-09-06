import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@zasfmy/commontick';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';
const router = express.Router();

//requireAuth middleware checks req has a currentUser prop that points to a decoded JWT token
router.post(
   '/api/tickets',
   requireAuth,
   [
      body('title').
         notEmpty().
         withMessage('Title is required'),
      body('price'). 
         isFloat({gt:0}). 
         withMessage('Price must be greater than 0')
   ],
   validateRequest,
   async (req: Request, res: Response) => {
      const {title,price}=req.body;
      const ticket=Ticket.build({
         title,
         price,
         //we have got req.currentUser defied since mz middleware does that
         userId:req.currentUser!.id
      });
      await ticket.save();
      res.status(201).send(ticket);
   }
)

export {
   router as createTicketRouter
}