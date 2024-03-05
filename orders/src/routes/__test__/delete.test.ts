import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { Order, OrderStatus } from '../../models/order';

//by cancelling an order, we set the status to cancelled
it('marked an order as cancelled upon deletion',async()=>{
   const user = global.signing();

   //create a ticker
   const ticket = Ticket.build({
      title:'abc',
      price:20
   });
   //make a request to create an order
   const{body:order}=await request(app).
      post('/api/orders'). 
      set('Cookie',user). 
      send({ticketId: ticket.id}). 
      expect(201);

   //make a request to cancel the order
   await request(app). 
      delete(`/api/orders/${order.id}`). 
      set('Cookie',user). 
      send(). 
      expect(204);

   //expect the order to be cancelled
   const updatedOrder = await Order.findById(order.id);
   expect(updatedOrder?.status).toEqual(OrderStatus.Cancelled);
})

it.todo('emits an order cancelled event',async()=>{
   
})