import express, { Request, Response } from "express";
import {
  requireAuth,
  validateRequest,
  NotFound,
  BadRequestError,
} from "@zasfmy/commontick";
import { body } from "express-validator";
import mongoose from "mongoose";
import { Ticket } from "../models/ticket";
import { Order } from "../models/order";
import { OrderStatus } from "@zasfmy/commontick/build/events/types/order-status";

const router = express.Router();
//15 minutes is the max time a user can reserve a purchase a ticket
const expirationWindowSecond = 15 * 60;

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
    const { ticketId } = req.body;



    //find the ticketId inside Tickets collection that comes from body
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) throw new NotFound();



    //making sure that ticket we are reserving is not reserved
    const isReserved = await ticket.isReserved();
    if (isReserved) throw new BadRequestError("Ticket is already reserved");



    //calculate an expiration date for user to purchase ticket
    const expiration = new Date();
    //setting expiation to the current date + 15 minutes
    expiration.setSeconds(expiration.getSeconds() + expirationWindowSecond);


    
    //build the order and save to db:
    const order = new Order({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket,
    });
    await order.save();

    //publish an event that it was created
    res.status(201).send(order);
  }
);

export { router as newOrderRouter };
