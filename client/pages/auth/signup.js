import { useState } from 'react';
import useRequest from '../../hooks/useRequest';
import Router from 'next/router';

const page = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const {doRequest,errors}=useRequest({
      url:'/api/users/signup',
      method:'post',
      body:{
         email,
         password
      },
      onSuccess:()=>Router.push('/')
   });

   const onSubmit = async (e) => {
      e.preventDefault();
      await doRequest();
   }

   return (
      <form onSubmit={onSubmit}>
         <h1>Sign up</h1>
         <div className='form-group'>
            <label>Email address</label>
            <input className='form-control' onChange={(e) => setEmail(e.target.value)} />
         </div>
         <div className='form-group'>
            <label>Password</label>
            <input className='form-control' onChange={(e) => setPassword(e.target.value)} />
         </div>
         {errors}
         <button className='btn btn-primary' type='submit'>Sign up</button>
      </form>
   )
}

export default page;