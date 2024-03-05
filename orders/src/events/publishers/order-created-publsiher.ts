import { Publisher, Subjects, OrderCreatedEvent } from "@zasfmy/commontick";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
   subject: Subjects.OrderCreated = Subjects.OrderCreated;

}