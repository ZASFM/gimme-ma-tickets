import { requireAuth } from '@zasfmy/commontick';
import express,{Request, Response} from 'express';
import { body } from 'express-validator';
import { Order } from '../models/order';

const router=express.Router();

router.get(
   '/api/orders',
   requireAuth,
   async(req:Request, res:Response)=>{
      //get all the orders that has the id user
      const orders = Order.find({
         userId: req.currentUser?.id
      }).populate('ticket');
      res.send(orders);
   }
)

export {router as indexOrderRouter}