import axios from "axios";

//comes from the context, context.headers.cookies or context.headers.host as {req}
export default ({req})=>{
   //im on the server
   if(typeof window === undefined){
      //here im creating axios instances to have the preconfigured req data.
      //if window does not exists (window object only availabale from the browser), then SST, and connecting from client to ingress controller> http://ingess-nginx.ingress-nginx....
      return axios.create({
         baseURL:'http://ingress-nginx-controller.ingress-nginx.controller.svc.cluster.local',
         //inside my ingress controller I have defined as host ticketing.dev, so I if I dont mention this, a 404 will be shown
         //req.headers contains the host "ticketing.dev", and the COOKIES
         headers:req.headers
      })
   }else{
      //im on the browser
      //Im on the client/browser, so it will add the headers to it
      //if im not in the ssr im making req from the brwoser, so use / as base url for the req, here i shall also not worry about appending headers to the req, since the headers is appended from the browser
      return axios.create({
         baseURL:'/'
      })
   }
}