import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

//mocking nats client from __mocks__
jest.mock('../../nats-wrapper');

//testing routes indeed is accessible, since it does not triggers my catch all route handler which throws  a404
it('it has a route handler listening to /api/tickets to  post requests', async () => {
   const response = await request(app).
      post('/api/tickets').
      send({});

   expect(response.status).not.toEqual(404);
});

it('it can ony be access if user is logged in', async () => {
   //this is gonna trigger mz notAuthorized error which throws a 401
   await request(app).
      post('/api/tickets').
      send({}).
      expect(401)
});

//if user is authenticated is should not return a 401, passing cookie from global.signing
it('returns anything but 401 if user is signed in', async () => {
   const response = await request(app).
      post('/api/tickets').
      set('Cookie', global.signing()).
      send({});

   expect(response.status).not.toEqual(401);
});

//should throw an error if title is invalid
it('returns error if invalid title is provided', async () => {
   await request(app).
      post('/api/tickets').
      set('Cookie', global.signing()).
      send({
         title: '',
         price: 123
      }).
      expect(400);

   await request(app).
      post('/api/tickets').
      set('Cookie', global.signing()).
      send({
         price: 123
      }).
      expect(400);
});

//should throw an error if price has wrong format
it('returns error if invalid price is provided', async () => {
   await request(app).
      post('/api/tickets').
      set('Cookie', global.signing()).
      send({
         title: 'title',
         price: ''
      }).
      expect(400);

   await request(app).
      post('/api/tickets').
      set('Cookie', global.signing()).
      send({
         title: 'title',
      }).
      expect(400);
});

//create a ticket
it('creates a ticket with valid data', async () => {
   //add in one check to see something was saved in the database
   //before anz test i erase the database, so its length should be 0
   let tickets=await Ticket.find({});
   expect(tickets.length).toEqual(0);
   await request(app). 
      post('/api/tickets'). 
      set('Cookie',global.signing()).
      send({
         title:'title',
         price:123
      }). 
      expect(201);

      //after making a ticket it should be saved in the db
      tickets=await Ticket.find({});
      expect(tickets.length).toEqual(1);
      expect(tickets[0].price).toEqual(20);
      expect(tickets[0].title).toEqual('title');
 });
