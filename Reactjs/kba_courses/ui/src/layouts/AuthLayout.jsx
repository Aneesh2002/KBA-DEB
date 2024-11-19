import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import getUserType from '../utiles/auth'

const AuthLayout = () => {
  const userType=getUserType();
  if(!userType){
    return <Navigate to='/' />
  }
  return <Outlet />
  
  
}

export default AuthLayout
