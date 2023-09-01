import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from 'supertest';

//adding signin function to global interface
declare global {
   var signin: () => Promise<string[]>;
}

let mongo: any;
beforeAll(async () => {
   process.env.JWT_SECRET = '123';
   mongo = await MongoMemoryServer.create();
   const mongoUri = mongo.getUri();
   await mongoose.connect(mongoUri, {});
})

beforeEach(async () => {
   const collections = await mongoose.connection.db.collections();
   for (let collection of collections) {
      await collection.deleteMany({});
   }
})

afterAll(async () => {
   if (mongo) {
      await mongo.stop();
   }
   await mongoose.connection.close();
});

function signing() {
   throw new Error("Function not implemented.");
}

//this global sign in is now gonna wie inside the tickets pod
global.signin = async () => {
   const email = 'test@test.com';
   const password = '123456789';

   const response = await request(app).
      post('/api/users/signup').
      send({
         email,
         password
      }).
      expect(201);

   const cookie = response.get('Set-Cookie');

   return cookie;
}