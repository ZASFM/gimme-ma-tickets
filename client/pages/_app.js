import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';

//im passing as props to the app an object with>
/*
{
   Component,
   {
      pageProps,
      currentUser:{
         id,
         name,
         email,
      }
   }
}
*/ 
const AppComponent = ({ Component, pageProps, currentUser }) => {
   return (
      <>
         {/*<Header/>*/}
         <Component
            {...pageProps}
         />
      </>
   )
}

//I need to check if getInitialProps is getting run from the server (SSR) or the client
//appContext is the request comming to the getInitalPrpos from the client, it has info about the host, the cookie and etc... appContext.ctx.headers for ex
/*appContext--> {
   Component:{###this is the component that m trying to render, can be a home, about or payment page
      getInitialProps()####this is the getInitialProps of the current compnent
   },
   ctx...
}*/
AppComponent.getInitialProps = async (appContext) => {
   //since inside mz helper function I have created an axios instance, I still need to attach there a .get/post/delete/update... methods
   //this is the data from the upper app
   const {data}=await buildClient(appContext.ctx).get('/api/user/currentuser');
   //this is the context from the component that im trying to render, and im passing the appContext.ctx of the root, since it has the cookies and host necesarrz
   let pageProps={};
   if(appContext.Component.getInitialProps){
      //I have to also call the getInitialProps of the rendered component, because if i call the getInitialProps at the app, the getInitialProps of the component wont be summoned.
      //then i can the components getInitialProps and pass the data to the component as props to that component.
      pageProps=await appContext.Component.getInitialProps(appContext.ctx)
   }
   return {
      pageProps, 
      ...data
   };
}

export default myApp;