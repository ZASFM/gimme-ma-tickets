import {Publisher, Subjects, TicketCreatedEvent} from '@zasfmy/commontick';

export class TicketCreatedPublisher extends Publisher<TicketCreatedPublisher>{
   subject: Subjects.TicketCreated = Subjects.TicketCreated;
   data:any=0;
}

