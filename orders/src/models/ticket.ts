import mongoose from "mongoose";
import { Order } from "./order";
import { OrderStatus } from "@zasfmy/commontick/build/events/types/order-status";

interface TicketAttrs{
   title: string,
   price: number,
}

interface TicketDoc extends mongoose.Document{
   title: string,
   price: number,
   //check if the ticket is already reserved
   isReserved():Promise<Boolean>
}

interface TicketModel extends mongoose.Model<TicketDoc>{
   build:(attrs:TicketAttrs)=>TicketDoc
}

const ticketSchema = new mongoose.Schema({
   title:{
      type:String,
      required:true
   },
   price:{
      type:Number,
      required:true,
      min:0
   }
},{
   toJSON:{
      transform(doc,ret){
         ret.id=ret._id;
         delete ret._id;
      }
   }
})

ticketSchema.statics.build=(attrs:TicketAttrs)=>{
   return new Ticket(attrs);
}

//method checks if this ticket we are trying to purchase is being reserved by someone else, it is possible by checking the ticket collection, searching for that ticket, and cheching its status
ticketSchema.methods.isReserved=async function(){
   //"this" is the document callled by isReserved inside order new.ts
   const existingOrder = await Order.findOne({
      ticket:this,
      status:{
        //check the value of status is on of the ones that the array contains
        //in operator gets the any thicket with id:ticketId, where status may equal to any the values passed inside the array
        $in:[
          OrderStatus.Created,
          OrderStatus.AwaitingPayment,
          OrderStatus.Complete,
        ]
      }
    });

   //this method returns a boolean
   return !!existingOrder;
}


const Ticket = mongoose.model<TicketDoc,TicketModel>('Ticket',ticketSchema);

export {Ticket,TicketDoc}