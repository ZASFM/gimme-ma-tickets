import request from 'supertest';
import {app} from '../../app';

//testing routes indeed is accessible, since it does not triggers my catch all route handler which throws  a404
it('it has a route handler listening to /api/tickets to  post requests',async()=>{
   const response=await request(app). 
      post('/api/tickets'). 
      send({});

   expect(response.status).not.toEqual(404);
});

it('it can ony be access if user is logged in',async()=>{
   //this is gonna trigger mz notAuthorized error which throws a 401
   await request(app). 
      post('/api/tickets'). 
      send({}). 
      expect(401)
});

//if user is authenticated is should not return a 401
it('returns anything but 401 if user is signed in',async()=>{
   const response=await request(app). 
   post('/api/tickets'). 
   send({});

expect(response.status).not.toEqual(401);
});
it('returns error if invalid title is provided',async()=>{});
it('returns error if invalid price is provided',async()=>{});
it('creates a ticket with valid data',async()=>{});
