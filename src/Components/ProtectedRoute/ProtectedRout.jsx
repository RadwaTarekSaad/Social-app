import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRout = ({children}) => {
    if(localStorage.getItem("token")==null){
        return <Navigate to={"/login"}/>
    }
  return (
    <>
      {children}
    </>
  )
}

export default ProtectedRout
