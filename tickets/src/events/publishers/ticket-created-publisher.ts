import {Publisher, Subjects, TicketCreatedEvent} from '@zasfmy/commontick';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
   subject: Subjects.TicketCreated = Subjects.TicketCreated;
   data:any=0;
}

