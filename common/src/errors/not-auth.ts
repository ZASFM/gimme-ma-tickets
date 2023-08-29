import { CustomError } from "./custom-error";

export class notAuthorized extends CustomError{
   statusCode= 401

   constructor(){
      super();
      Object.setPrototypeOf(this,notAuthorized.prototype);
   }

   serializeErrors() {
      return [{message:'Not authorized'}]
   }
}