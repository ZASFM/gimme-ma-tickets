import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { TicketCreatedEvent } from "./ticketCreatedEvent";
import { Subjects } from "./subjects";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
   readonly subject:Subjects.TicketCreated = Subjects.TicketCreated;
   queueName = "payments-service";
   onMessage(data: TicketCreatedEvent["data"], msg: Message) {
     msg.ack();
   }
 }
 