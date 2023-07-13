import request from "supertest";
import { app } from "../../app";

//simple workflow test
it('send post request with data to create user, and get 201', async () => {
   return request(app).
      post('/api/users/signup').
      send({
         email: 'test@test.com',
         password: '123456789'
      }).
      expect(201);
});

//invalid credentials check (email):
it('get 400 for invalid credentials', async () => {
   return request(app).
      post('/api/users/signup').
      send({
         email: '124',
         password: '1032122'
      }).
      expect(400);
});

//invalid credentials check (password):
it('get 400 for invalid credentials, email', async () => {
   return request(app).
      post('/api/users/signup').
      send({
         email: 'test@test.com',
         password: '1'
      }).
      expect(400);
});

//invalid credentials check:
it('get 400 for invalid credentials, password', async () => {
   return request(app).
      post('/api/users/signup').
      send({
         email: '124',
         password: '1032122'
      }).
      expect(400);
});

//invalid credentials check, email and password:
it('get 400 for invalid credentials for both email and password', async () => {
   await request(app).
      post('/api/users/signup').
      send({
         email: 'test@test.com',
         password: '1'
      }).
      expect(400);

   return request(app).
      post('/api/users/signup').
      send({
         email: '124',
         password: '2123133'
      }).
      expect(400);
});

//it dialows tow repeated emails
it('disalow duplicate emails', async () => {
   await request(app).
      post('/api/users/signup').
      send({
         email: 'test@test.com',
         password: '123456789'
      }).
      expect(201);

   return request(app).
      post('/api/users/signup').
      send({
         email: 'test@test.com',
         password: '123456789'
      }).
      expect(400);
});

//cheching that cookie has a jwt token:
it('sets cookie after sign up',async()=>{
   const response=await request(app). 
      post('/api/users/signup'). 
      send({
         email: 'test@test.com',
         password: '123456789'
      }).
      expect(201);

   expect(response.get('Set-Cookie')).toBeDefined();
});




