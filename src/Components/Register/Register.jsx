import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as z from "zod";
const Register = () => {
  const[isLoading,setIsLoading]=useState(false);
  const Navigate=useNavigate()

const scheme=z.object({
    name:z.string().min(3,"min length 3").max(15,"max length 15"),
    username:z.string().min(3,"min length 3").max(15,"max length 15"),
    email:z.email("Invalid email"),
    password:z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,"enter valid password"),
    rePassword:z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,"enter valid repassword"),
    dateOfBirth:z.coerce.date().refine(function(value){
 const currentYear=new Date().getFullYear() //2026
           const UserYear=value.getFullYear()
           if(currentYear - UserYear >= 18){
            return true
           }
           return false
    },"18 > "),
    gender:z.enum(["female","male"])
}).refine(function(values){
  if(values.password === values.rePassword){
    return true
  }
  return false

},"repassword doesn't match")

 
const {handleSubmit,register,formState:{errors,touchedFields}}=  useForm({
  defaultValues:{
 name:"",
 username:"",
 email:"",
 dateOfBirth:"",
 gender:"",
 password:"",
 rePassword:""
},resolver:zodResolver(scheme)
})
 async function signUp(values){
  setIsLoading(true)
  try{
   
    const {data}=await axios.post("https://route-posts.routemisr.com/users/signup",values)
    console.log(data);
     toast.success(data.message)
       
     setIsLoading(false);
      Navigate("/login")

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
        <h1 className='mb-16 text-4xl text-center'>register component</h1>
  
         <form onSubmit={handleSubmit(signUp)}>
      {/* name */}
      <input id="name" {...register("name")}  type="text" placeholder="Name" className="input input-primary w-full mb-4" />

      {errors?.name && touchedFields?.name && <p className='text-red-700 mb-3'>{errors?.name?.message}</p>}
      {/* username */}
      
      <input id="username" {...register("username")}  type="text" placeholder="username" className="input input-primary w-full mb-4" />

      {errors?.username && touchedFields?.username && <p className='text-red-700 mb-3'>{errors?.username?.message}</p>}

       {/* email */}
      <input id="email" {...register("email")} type="email" placeholder="Email" className="input input-primary w-full mb-4" />
      {errors?.email && touchedFields?.email && <p className='text-red-700 mb-3'>{errors?.email?.message}</p>}

 {/* password */}
      <input id="password" {...register("password")} type="password" placeholder="Password" className="input input-primary w-full mb-4" />
       {errors?.password && touchedFields?.password && <p className='text-red-700 mb-3'>{errors?.password?.message}</p>}
      {/* rePassword */}
      <input id="rePassword" {...register("rePassword")} type="password" placeholder="rePassword" className="input input-primary w-full mb-4" />
       {errors?.rePassword && touchedFields?.rePassword && <p className='text-red-700 mb-3'>{errors?.rePassword?.message}</p>}
        {/* dateOfBirth */}
      <input id="dateOfBirth" {...register("dateOfBirth")} type="date" placeholder="Date Of Birth" className="input input-primary w-full mb-4" />
            {errors?.dateOfBirth && touchedFields?.dateOfBirth && <p className='text-red-700 mb-3'>{errors?.dateOfBirth?.message}</p>}
      {/* gender */}
     <div className='mb-4'>
       <input {...register("gender")} value={"male"}  type="radio" name="gender" className="radio radio-primary" id="male" defaultChecked />
       <label htmlFor='male' className='ms-5 me-5'>Male</label>
<input {...register("gender")} type="radio" name="gender" value={"female"} id="female" className="radio radio-primary" />
 <label htmlFor='female' className='ms-5 me-5'>Female</label>
     </div>
      {errors?.gender && touchedFields?.gender && <p className='text-red-700 mb-3'>{errors?.gender?.message}</p>}

<button type='submit' className="btn btn-primary w-full">{isLoading? <i class="fa-solid fa-spinner"></i>:"Register" }</button>

      </form>
      </div>
     
      
    </div>
  )
}

export default Register
