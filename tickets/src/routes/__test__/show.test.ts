import request from "supertest";
import { Ticket } from "../../models/ticket";
import { app } from "../../app";
import mongoose from "mongoose";

it('returns 404 if ticket is not found',async()=>{
   //id must be a correct id otherwise test is gonna throw an error
   const id=new mongoose.Types.ObjectId().toHexString();
   await request(app). 
      get(`/api/tickets/${id}`). 
      send(). 
      expect(404);
})

it('returns the ticket if ticket is found',async()=>{
   //we have to make sure there is a ticket inside the db, so we create one
   const title='title';
   const price=20
   const response=await request(app).
      post('/api/tickets'). 
      set('Cookie',global.signing()). 
      send({
         title,
         price
      }). 
      expect(201);

   //checking my previous created tickets exists in the db 
   const ticketResponse=await request(app). 
      get(`/api/tickets/${response.body.id}`). 
      send(). 
      expect(200);

   expect(ticketResponse.body.title).toEqual(title);
   expect(ticketResponse.body.price).toEqual(price);
})