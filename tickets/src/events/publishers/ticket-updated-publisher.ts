import { Publisher, Subjects, TicketUpdatedEvent } from "@zasfmy/commontick";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
   subject: Subjects.TicketUpdated=Subjects.TicketUpdated;
}