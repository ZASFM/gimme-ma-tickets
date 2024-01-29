import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";

export class TicketCreatedListener extends Listener {
   subject = "ticket:created";
   queueName = "payments-service";
   queueGroup = "payments-service";
   onMessage(data: any, msg: Message) {
     msg.ack();
   }
 }
 