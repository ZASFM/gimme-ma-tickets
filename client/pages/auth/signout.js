import { Router } from "next/router";
import useRequest from "../../hooks/useRequest";
import { useEffect } from "react";

const page=()=>{
  const {doRequest}=useRequest({
   url:'/api/user/signout',
   method:'post',
   body:{},
   onSuccess:()=>Router.push('/')
  })

  useEffect(()=>{
   doRequest();
  },[])

   return (
      <div>
         Signing out ...
      </div>
   )
}

export default page;