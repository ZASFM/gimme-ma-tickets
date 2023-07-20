import axios from "axios";
import { useState } from "react";

const useRequest = ({ url, method, body, onSuccess }) => {
   const [errors, setErrors] = useState(null);

   const doRequest = async () => {
      setErrors(null);
      try {
         const response = await axios[method](url, body);

         //calling the callback function upon successfully making the request that redirects me to the landing page
         if (onSuccess) {
            onSuccess(response.data);
         }

         return response.data;
      } catch (err) {
         setErrors(
            <div className='alert alert-danger'>
               <h4>Opps...</h4>
               <ul>
                  {err.response.data.errors.map(err => {
                     return (
                        <li key={err.message}>
                           {err.message}
                        </li>
                     )
                  })}
               </ul>
            </div>
         )
      }
   }

   return {
      doRequest,
      errors
   }
}

export default useRequest;