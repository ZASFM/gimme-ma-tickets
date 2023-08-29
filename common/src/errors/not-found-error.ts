import { CustomError } from "./custom-error";

export class NotFound extends CustomError{
   statusCode=404;

   constructor(){
      super();

      Object.setPrototypeOf(this,NotFound.prototype);
   }

   serializeErrors(){
      return [{
         message:'not found'
      }]
   }
}