import request from 'supertest';
import { app } from '../../app';

it('clears cookie after signing out',async()=>{
   //signing up
   await request(app). 
      post('/api/users/signup'). 
      send({
         email:'test@test.com',
         password:'123456789'
      }). 
      expect(201);

      //signing out
   const response=await request(app). 
      post('/api/users/signout'). 
      send({}). 
      expect(200);
   
      //checking there is no cookie
   expect(response.get('Set-Cookie')).toBeDefined();
})