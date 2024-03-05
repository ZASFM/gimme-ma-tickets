import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Order, OrderStatus } from "../../models/order";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";

it("returns an error, if user reserves a ticket that does not exists", async () => {
  //making an order using a randomly generated id, should return 404, ticket not found
  const ticketId = new mongoose.Types.ObjectId();
  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signing())
    .send({
      ticketId,
    })
    .expect(404);
});

it("returns error if ticket is already reserved", async () => {
  //1: create ticket
  const ticket = Ticket.build({
    title: "abc",
    price: 20,
  });
  await ticket.save();
  //2: create an order with that ticket
  const order = Order.build({
    ticket,
    userId: "abcdefj",
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });
  await order.save();
  //3: create another order with the already reserved ticket
  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signing())
    .send({ ticketId: ticket.id })
    .expect(400);
});

it("reserve a ticket", async () => {
  //create a ticket
  const ticket = Ticket.build({
    title: "abc",
    price: 20,
  });
  await ticket.save();

  //create an order with the previously created ticket
  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signing())
    .send({ ticketId: ticket.id })
    .expect(201);
});

it.todo('publishes an event to event bus',async()=>{
     //create a ticket
  const ticket = Ticket.build({
    title: "abc",
    price: 20,
  });
  await ticket.save();

  //create an order with the previously created ticket
  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signing())
    .send({ ticketId: ticket.id })
    .expect(201);

    ///trigger mock implementation to trick jest the callback function was executed, this publish equal to the publish function inside new.ts while emitting event
  expect(natsWrapper.client.publish).toHaveBeenCalled();
})