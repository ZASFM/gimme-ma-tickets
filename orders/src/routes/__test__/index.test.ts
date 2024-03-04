import request from "supertest"
import { app } from "../../app"
import { Order } from "../../models/order"
import { Ticket } from "../../models/ticket"

const buildTicket = async() =>{
   const ticket = Ticket.build({
      title:'abc',
      price:20
   });
   await ticket.save();
   return ticket;
}

it('gets all orders for a particular user',async ()=>{
   //create three tickets
   const ticket1 = await buildTicket();
   const ticket2 = await buildTicket();
   const ticket3 = await buildTicket();
   //create one order as user no 1
   const user1= global.signing();
   const user2= global.signing();
   
   await request(app).
      post('/api/order'). 
      set('Cookie',user1). 
      send({ticketId:ticket1.id}). 
      expect(201);
   await request(app).
      post('/api/order'). 
      set('Cookie',user2). 
      send({ticketId:ticket2.id}). 
      expect(201);
   await request(app).
      post('/api/order'). 
      set('Cookie',user2). 
      send({ticketId:ticket3.id}). 
      expect(201);
   //create two order as user no 2
   const response = await request(app).
      get('/api/orders'). 
      set('Cookie',user2);
      expect(200);

   expect(response.body.length).toEqual(2);

})