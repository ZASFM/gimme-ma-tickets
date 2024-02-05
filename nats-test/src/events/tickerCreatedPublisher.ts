import { Publisher } from "./base-publisher";
import { Subjects } from "./subjects";
import { TicketCreatedEvent } from "./ticketCreatedEvent";

export class TickerCreatedPublisher extends Publisher<TicketCreatedEvent>{
   subject:Subjects.TicketCreated=Subjects.TicketCreated
}