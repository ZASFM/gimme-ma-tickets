import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns 404 if provided id does not exist',async()=>{
   //creating mongo id
   const id=new mongoose.Types.ObjectId().toHexString();

   await request(app). 
      put(`/api/tickets/${id}`). 
      set('Cookie',global.signing()). 
      send({
         title:'title',
         price:200
      }). 
      expect(404);
})

it('returns 401 if user is not authenticated',async()=>{
   //creating mongo id
   const id=new mongoose.Types.ObjectId().toHexString();

   await request(app). 
      put(`/api/tickets/${id}`). 
      send({
         title:'title',
         price:200
      }). 
      expect(401);
})

it('returns 404 if user does not own ticket',async()=>{
   //create a ticket with a user 
   const response=await request(app). 
      post('/api/tickets'). 
      set('Cookie',global.signing()). 
      send({
         title:'title',
         price:20
      });

   //update the ticket with a new user, sing a new global.signin()
   await request(app). 
      put(`/api/tickets/${response.body.id}`). 
      set('Cookie',global.signing()). 
      send({
         title:'title updated',
         price:2000
      }). 
      expect(401);
})

it('returns 400 if user provides invalid inputs',async()=>{

})

it('returns and updates ticket',async()=>{

})