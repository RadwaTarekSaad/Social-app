import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as z from "zod";
import { authContext } from '../Context/AuthContext';
const Login = () => {
const{insertUserToken}=  useContext(authContext)
  const[isLoading,setIsLoading]=useState(false);
  const Navigate=useNavigate()

const scheme=z.object({
   
    email:z.email("Invalid email"),
    password:z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,"enter valid password"),
   
})

 
const {handleSubmit,register,formState:{errors,touchedFields}}=  useForm({
  defaultValues:{
  email: "",
  password: ""
},resolver:zodResolver(scheme)
})
 async function signIn(values){
  setIsLoading(true)
  try{
   
    const {data}=await axios.post("https://route-posts.routemisr.com/users/signin",values)
    console.log(data.data);
    insertUserToken(data.data.token)
    localStorage.setItem("token",data.data.token)
    toast.success(data.message)

     setIsLoading(false);
      Navigate("/")



  }
    
  catch(e){
 toast.error(e.response?.data.errors)
  setIsLoading(false)
    
  }
  // if(values.password === values.rePassword){
  //   console.log(values)

  // }else{
  //   setError("rePassword",{message:"repassword doesn't match"})
  // }
    
  }




  return (
    <div className='flex justify-center my-20 px-10 md:px-0'>
      <div className='w-full md:w-1/2 p-8 shadow-2xl shadow-blue-300/30'>
        <h1 className='mb-16 text-4xl text-center'>Login component</h1>
  
         <form onSubmit={handleSubmit(signIn)}>
     

       {/* email */}
      <input id="email" {...register("email")} type="email" placeholder="Email" className="input input-primary w-full mb-4" />
      {errors?.email && touchedFields?.email && <p className='text-red-700 mb-3'>{errors?.email?.message}</p>}

 {/* password */}
      <input id="password" {...register("password")} type="password" placeholder="Password" className="input input-primary w-full mb-4" />
       {errors?.password && touchedFields?.password && <p className='text-red-700 mb-3'>{errors?.password?.message}</p>}
      

<button type='submit' className="btn btn-primary w-full">{isLoading? <i class="fa-solid fa-spinner"></i>:"Login" }</button>

      </form>
      </div>
     
      
    </div>
  )
}

export default Login
