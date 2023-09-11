import { app } from "../../app";
import request from 'supertest';

const createTicket=()=>{
   return request(app). 
      post('/api/tickets'). 
      set('Cookie', global.signing()). 
      send({
         title:'title',
         price:20
      })
}

it('can fetch all tickets',async()=>{
   //creating 3 tickets
   await createTicket();
   await createTicket();
   await createTicket();

   //fetching tickets
   const response=await request(app). 
      get('/api/tickets'). 
      send(). 
      expect(200);

   expect(response.body.length).toEqual(3)
})