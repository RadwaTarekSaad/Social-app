import React, { createContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode'



export const authContext =createContext()
const AuthContextProvider = ({children}) => {

    const [token,setToken]=useState(null);
    const[userId,setUserId]=useState(null)

    function insertUserToken(tkn){
        setToken(tkn);
    }
  function logoutContext(){
    setToken(null);
    localStorage.removeItem("token")
  }

useEffect(function(){
    if(localStorage.getItem("token") != null){
        setToken(localStorage.getItem("token"))
    }
},[])
  //  console.log(token,"context")

  function decodeUserToken(){
   const decodedToken= jwtDecode(token);
  //  console.log('decoded token',decodedToken)
   setUserId(decodedToken.user)
  }
  useEffect(()=>{
    if(token){
      decodeUserToken();
    }
  },[token])

  return (
    <authContext.Provider value={
        {token,insertUserToken,logoutContext,userId}
    }>
             {children}
      
    </authContext.Provider>

   
   
  )
}

export default AuthContextProvider
