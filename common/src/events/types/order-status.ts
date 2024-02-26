export enum OrderStatus{
   //an order has been created to purchase a tix
   Created = 'created',
   //user cancels order ot the ticket is reserved
   Cancelled = 'cancelled',
   //order has successfully reserved ticket
   AwaitingPayment = 'awaiting:payment',
   //payment done, and order reserved ticket
   Complete = 'complete'
}