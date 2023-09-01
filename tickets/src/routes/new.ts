import express, { Request, Response } from 'express';
import { requireAuth } from '@zasfmy/commontick';
const router = express.Router();

//requireAuth middleware checks req has a currentUser prop that points to a decoded JWT token
router.post(
   '/api/tickets',
   requireAuth,
   (req: Request, res: Response) => {
      return res.status(200);
   }
)

export {
   router as createTicketRouter
}