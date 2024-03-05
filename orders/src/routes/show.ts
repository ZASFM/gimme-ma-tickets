import { NotFound, notAuthorized, requireAuth } from '@zasfmy/commontick';
import express,{Request, Response} from 'express';
import { Order } from '../models/order';

const router=express.Router();

router.get(
   '/api/orders/:orderId',
   requireAuth,
   async(req:Request, res:Response)=>{
      const order = await Order.findById(req.params.orderId).populate('ticket');
      
      if(!order) return new NotFound();

      //only the user who created the order can see that order
      if(order.id!==req.currentUser?.id) return new notAuthorized();
      res.send(order);
   }
)

export {router as showOrderRouter}