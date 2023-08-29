import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '@zasfmy/commontick';
import {User} from '../models/user';
import { BadRequestError } from '@zasfmy/commontick';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/api/users/signin', [
   body('email').
      isEmail().
      withMessage('Email must be valid'),
   body('password').
      trim().
      notEmpty().
      withMessage('Password must be valid')
],
   validateRequest,
   async (req: Request, res: Response) => {
      const {email,password}=req.body;

      //checking user exists:
      const existingUser=await User.findOne({email});
      if(!existingUser) throw new BadRequestError('Invalid credentials');

      //comparing password:
      const isPasswordCorrect=await Password.compare(existingUser.password,password);
      if(!isPasswordCorrect) throw new BadRequestError('Password incorrect');

      //sending JWT inside cookie:
      const userJwt=jwt.sign({
         id:existingUser.id,
         email:existingUser.email
      },process.env.JWT_SECRET!);

      req.session = {
         jwt: userJwt
      }

      res.status(201).send(existingUser);
   });

export { router as signInRouter }