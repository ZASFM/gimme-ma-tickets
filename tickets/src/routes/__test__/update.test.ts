import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

//mocking nats client from __mocks__
jest.mock('../../nats-wrapper');

it('returns 404 if provided id does not exist', async () => {
   //creating mongo id
   const id = new mongoose.Types.ObjectId().toHexString();

   await request(app).
      put(`/api/tickets/${id}`).
      set('Cookie', global.signing()).
      send({
         title: 'title',
         price: 200
      }).
      expect(404);
})

it('returns 401 if user is not authenticated', async () => {
   //creating mongo id
   const id = new mongoose.Types.ObjectId().toHexString();

   await request(app).
      put(`/api/tickets/${id}`).
      send({
         title: 'title',
         price: 200
      }).
      expect(401);
})

it('returns 404 if user does not own ticket', async () => {
   //create a ticket with a user 
   const response = await request(app).
      post('/api/tickets').
      set('Cookie', global.signing()).
      send({
         title: 'title',
         price: 20
      });

   //update the ticket with a new user, sing a new global.signin()
   await request(app).
      put(`/api/tickets/${response.body.id}`).
      set('Cookie', global.signing()).
      send({
         title: 'title updated',
         price: 2000
      }).
      expect(401);
})

it('returns 400 if user provides invalid inputs', async () => {
   //making request from the same cookie
   const cookie = global.signing();
   //creating a ticket
   const response = await request(app).
      post('/api/tickets').
      set('Cookie', cookie).
      send({
         title: 'title',
         price: 20
      });

   await request(app).
      put(`/api/tickets/${response.body.id}`).
      set('Cookie', cookie).
      send({
         title: '',
         price: 20
      }).
      expect(400);

   await request(app).
      put(`/api/tickets/${response.body.id}`).
      set('Cookie', cookie).
      send({
         title: 'abc',
         price: ''
      }).
      expect(400);
})

it('returns and updates ticket', async () => {
   //creating ticket
   const cookie = global.signing();
   const response = await request(app).
      post('/api/tickets').
      set('Cookie', cookie).
      send({
         title: 'title',
         price: 20
      });

   //updating ticket
   await request(app). 
      put(`/api/tickets/${response.body.id}`). 
      set('Cookie',cookie). 
      send({
         title:'title updated',
         price:123
      }). 
      expect(200);

   //checking that tickets was updated
   const ticketResponse=await request(app). 
      get(`/api/tickets/${response.body.id}`). 
      send();

   expect(ticketResponse.body.title).toEqual('title updated');
   expect(ticketResponse.body.price).toEqual(123);
})