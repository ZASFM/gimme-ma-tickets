import request from 'supertest';
import { app } from '../../app';

//beforeAll my mongoose instance on memory is getting empty
it('sign in with a non existent email',async()=>{
   return request(app). 
      post('/api/users/signin'). 
      send({
         email:'test@test.com',
         password:'123456789'
      }). 
      expect(400)
});

it('returns 400 on incorrect password',async()=>{
   //signing up
   await request(app). 
     post('/api/users/signup'). 
     send({
      email:'test@test.com',
      password:'123456789'
     }). 
     expect(201);
   
     //siging in
     await request(app). 
     post('/api/users/signin'). 
     send({
      email:'test@test.com',
      password:'1234321'
     }). 
     expect(400);
});

it('gets a cookie after successfully signing in',async()=>{
     //signing up
     await request(app). 
     post('/api/users/signup'). 
     send({
      email:'test@test.com',
      password:'123456789'
     }). 
     expect(201);
   
     //siging in
     const response=await request(app). 
     post('/api/users/signin'). 
     send({
      email:'test@test.com',
      password:'123456789'
     }). 
     expect(400); 

     expect(response.get('Set-Cookie')).toBeDefined();
});