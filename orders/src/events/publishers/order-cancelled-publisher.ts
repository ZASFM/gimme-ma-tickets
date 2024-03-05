import { Publisher, Subjects, OrderCancelledEvent } from "@zasfmy/commontick";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
   subject: Subjects.OrderCancelled=Subjects.OrderCancelled;
   
}