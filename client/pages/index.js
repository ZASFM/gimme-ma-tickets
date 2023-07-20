import axios from "axios";

const page=({currentUser})=>{
   return (
      <div>
         Landing page
      </div>
   )
}

page.getInitialProps=async()=>{
   const response=axios.get('/api/users/currentuser').catch((err) => {
      console.log(err.message);
    });
    return response.data;
}

export default page;