import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';


it('fetched the order',async()=>{
   //create a ticker
   const ticket = Ticket.build({
      title:'abc',
      price:20
   });
   await ticket.save();

   const user = global.signing();

   //make a request to build order with that ticket
   const {body:order}=await request(app). 
      post('/api/orders'). 
      set('Cookie',user). 
      send({ticketId:ticket.id}). 
      expect(201);

   
   //make a request to fetch the order
   const {body:fetchedOrder}=await request(app). 
      get(`/api/order/${order.id}`). 
      set('Cookie',user). 
      send(). 
      expect(200);

   expect(fetchedOrder.id).toEqual(order.id);
})