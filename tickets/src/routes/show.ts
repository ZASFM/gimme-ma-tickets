import express,{Request, Response} from 'express'
import { Ticket } from '../models/ticket'
import { NotFound } from '@zasfmy/commontick';
const router=express.Router();

router.get('/api/tickets/:id',async(
   req:Request,
   res:Response
)=>{
   try{
      //if ticket does not exists, then throw a 404
      const ticket=await Ticket.findById(req.params.id);
      if(!ticket){
         throw new NotFound();
      }
   }catch(err){
      console.log(err);
   }
})

export {
   router as TicketRouter
}