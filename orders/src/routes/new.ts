import express, { Request, Response } from "express";
import { requireAuth, validateRequest, NotFound, BadRequestError } from "@zasfmy/commontick";
import { body } from "express-validator";
import mongoose from "mongoose";
import { Ticket } from "../models/ticket";
import { Order } from "../models/order";
import { OrderStatus } from "@zasfmy/commontick/build/events/types/order-status";

const router = express.Router();

router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      //although not recomendable, checking the the incomming ticketIf from the body, is similar to mongodb id
      //this middleware checks only if id is string, so an id of 123 would pass the check
      //the ticketId should be a mongodb id type
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("ticketId must be a string"),
  ],
  async (req: Request, res: Response) => {
    const {ticketId}=req.body;
    //find the ticketId inside Tickets collection that comes from body
    const ticket = await Ticket.findById(ticketId);
    if(!ticket) throw new NotFound();

    
    const isReserved = await ticket.isReserved();
    if(isReserved) throw new BadRequestError('Ticket is already reserved');


    res.send();
  }
);

export { router as newOrderRouter };
