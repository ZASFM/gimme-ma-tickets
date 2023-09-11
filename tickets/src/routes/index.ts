import { Ticket } from '../models/ticket';
import express, { Request, Response } from 'express';
const router=express.Router();

router.get('/api/tickets',async(req:Request, res:Response)=>{
   const tickets=await Ticket.find({});
   res.status(200).send(tickets)
})

export {
   router as indexRouter
}