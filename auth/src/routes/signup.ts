import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/validate-request';
const router = express.Router();
import { BadRequestError } from '../errors/bad-request-error';

router.post('/api/users/signup', [
   //validation middleware
   body('email')
      .isEmail()
      .withMessage('email must be a string'),
   body('password')
      .trim()
      .isLength({ max: 20, min: 4 })
      .isString()
      .withMessage('password should be at least between 4 and 20 characters')
],
   validateRequest,
   async (req: Request, res: Response) => {

      const { email, password } = req.body;
      //checking if email is in user:
      const existingUser = await User.findOne({ email });
      if (existingUser) {
         throw new BadRequestError('Email already exists');
      }

      //save user:
      const user = User.build({ email, password });
      await user.save();

      //creating jwt
      const userJwt = jwt.sign({
         id: user.id,
         email: user.email
      },
         process.env.JWT_KEY!
      );

      //storing session cookie
      req.session = {
         jwt: userJwt
      }

      res.status(201).send(user);

   })

export { router as signUpRouter }