import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@zasfmy/commontick';
import { body } from 'express-validator';
const router = express.Router();

//requireAuth middleware checks req has a currentUser prop that points to a decoded JWT token
router.post(
   '/api/tickets',
   requireAuth,
   [
      body('title').
         notEmpty().
         withMessage('Title is required'),
      body('price'). 
         isFloat({gt:0}). 
         withMessage('Price must be greater than 0')
   ],
   validateRequest,
   (req: Request, res: Response) => {
      return res.status(200);
   }
)

export {
   router as createTicketRouter
}