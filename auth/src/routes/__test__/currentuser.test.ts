import request from 'supertest';
import { app } from '../../app';

it('responds with details about current user',async()=>{
      //extracting cookie form my response, function is declared and attached to global inside setup file
   const cookie=await global.signin();

   //passing cookie to currentUser middleware
   const response=await request(app). 
      get('/api/users/currentUser'). 
      set('Cookie',cookie).
      send(). 
      expect(200);
   
   expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('current user responds with a null with jwt is not correct',async()=>{
   const response=await request(app). 
      get('/api/users/currentUser'). 
      send(). 
      expect(200);
   
   expect(response.body.currentUser).toEqual(null);
})