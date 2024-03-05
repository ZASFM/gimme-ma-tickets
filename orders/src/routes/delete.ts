import { NotFound, notAuthorized, requireAuth } from "@zasfmy/commontick";
import express, { Request, Response } from "express";
import { Order, OrderStatus } from "../models/order";
import { OrderCancelledPublisher } from "../events/publishers/order-cancelled-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

//by deleting an order we dont delete the order but rather setting its status to cancelled
router.delete(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate("ticket");

    if (!order) throw new NotFound();

    //only the user who created the order can see that order
    if (orderId !== req.currentUser?.id) throw new notAuthorized();

    order.status = OrderStatus.Cancelled;
    await order.save();

    //publish an event that this order was cancelled:
    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      ticketId: {
        id: order.ticket.id,
      },
    });

    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
