import axios from "axios";

const page = ({ currentUser }) => {
   return (
      <div>
         Landing page
      </div>
   )
}

//I need to check if getInitialProps is getting run from the server (SSR) or the client
//req is the request comming to the getInitalPrpos from the client, it has info about the host, the cookie and etc...
page.getInitialProps = async ({req}) => {
   if (typeof window === undefined) {
      //if window does not exists (window object only availabale from the browser), then SST, and connecting from client to ingress controller> http://ingess-nginx.ingress-nginx....
      const { data } = await axios.get('http://ingress-nginx-controller.ingress-nginx-controller.svc.cluster.local/api/user/currentuser',{
         headers:{
            //inside my ingress controller I have defined as host ticketing.dev, so I if I dont mention this, a 404 will be shown
            //req.headers contains the host "ticketing.dev", and the COOKIES
            Host:req.headers
         }
      });
      return data;
   } else {
      //if im not in the ssr im making req from the brwoser, so use / as base url for the req, here i shall also not worry about appending headers to the req, since the headers is appended from the browser
      const { data } = await axios.get('/api/user/currentuser');
      return data;
   }
   return {};
}

export default page;