import React from 'react'
import Login from '../Login/Login';
import { Navigate } from 'react-router-dom';

export default function ProtectedRouting({children}) {
  if(localStorage.getItem("token")){
  return children;
  }else{
    return <Navigate to='/login'/>;
  }
}
