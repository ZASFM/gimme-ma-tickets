import {Request, Response, NextFunction} from 'express';
import { RequestValidationError} from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-errors';

export const errorHandler=(
   err:Error,
   req:Request,
   res:Response,
   next:NextFunction
)=>{
   if(err instanceof RequestValidationError){
      const formattedError=err.errors.map(err=>{
         return {
            message:err.msg,
            field:err.type
         }
      });

      return res.status(400).send({errors:formattedError});
   }
   
   if(err instanceof DatabaseConnectionError){
      return res.status(503).send({errors:[{
         message:err.reason
      }]})      
   }
   res.status(400).send({errors:[{
      message:'Something went wrong'
   }]})  
}