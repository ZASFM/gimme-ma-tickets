import nats, { Message, Stan } from "node-nats-streaming";
import { randomBytes } from "crypto";
import { Listener } from "./events/base-listener";
import { TicketCreatedListener } from "./events/ticket-created-listener";

const stan = nats.connect("ticketing", randomBytes(4).toString(), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to Nats");

  //when listener is killed, exit process, so NATS, removes the lister from channel
  stan.on("close", () => {
    console.log("Nats exiting");
    process.exit();
  });

  new TicketCreatedListener(stan).listen();
});

stan.on("SIGINT", () => stan.close());
stan.on("SIGTERM", () => {
  stan.close();
});
