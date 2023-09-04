import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from 'supertest';
import jwt from 'jsonwebtoken';

//adding signin function to global interface
declare global {
   var signing: () => string[];
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

//this signin isgonna serve to create a jwt and use it for signin for tests
global.signing =  () => {
   //create jwt payload: {name:'',email:''}
   const payload = {
      id: '123456789',
      email: 'email@email.com'
   }
   //create a jwt
   const token = jwt.sign(payload, process.env.JWT_KEY!);
   //build session obj: {jwt: 'MY_JWT'}
   const session = { jwt: token }
   //Turn that session into json
   const tokenJSON = JSON.stringify(session);
   //Take json and turn it into base64
   const base64 = Buffer.from(tokenJSON).toString('base64');
   //return string, supertest want an array of string as cookie, so im gonna send mzz cookie in an array
   return [`session=${base64}`];
}