import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError} from '../errors/request-validation-error';
import { User } from '../models/user';
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
], async (req: Request, res: Response) => {
   //checking error
   const errors=validationResult(req);
   //returning error in case there is
   if(!errors.isEmpty()){
      throw new RequestValidationError(errors.array());
   }

   const {email,password}=req.body;
   //checking if email is in user:
   const existingUser=await User.findOne({email});
   if(existingUser){
      throw new BadRequestError('Email already exists');
   }

   //hash password:


   //save user:
   const user=User.build({email,password});
   await user.save();

   res.status(201).send(user);

})

export { router as signUpRouter }