import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post('/api/users/signup', [
   //validation midleware
   body('email')
      .isEmail()
      .withMessage('email must be a string'),
   body('password')
      .trim()
      .isLength({ max: 20, min: 4 })
      .isString()
      .withMessage('password should be at least between 4 and 20 characters')
], (req: Request, res: Response) => {
   //checking error
   const errors=validationResult(req);
   //returning error in case there is
   if(!errors.isEmpty()){
      return res.status(400).send(errors.array());
   }
   const { email, password } = req.body;
   console.log('user created');
   res.send('was app');
   
})

export { router as signUpRouter }