import  buildClient from '../api/build-client';

const page = ({ currentUser }) => {
   return (
      <div>
         Landing page
      </div>
   )
}

//I need to check if getInitialProps is getting run from the server (SSR) or the client
//context is the request comming to the getInitalPrpos from the client, it has info about the host, the cookie and etc... context.headers for ex
page.getInitialProps = async (context) => {
   //since inside mz helper function I have created an axios instance, I still need to attach there a .get/post/delete/update... methods
   const {data}=await buildClient(context).get('/api/user/currentuser');
   return data;
}

export default page;