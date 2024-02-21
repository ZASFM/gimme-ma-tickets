import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@zasfmy/commontick";
import { body } from "express-validator";
import mongoose from "mongoose";

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
    res.send();
  }
);

export { router as newOrderRouter };
