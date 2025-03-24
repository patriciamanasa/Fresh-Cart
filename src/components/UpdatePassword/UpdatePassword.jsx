import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from "yup"
export default function UpdatePassword() {
  let navg =useNavigate()
  let[errMessage,setErr]=useState(null)
  let validYup=Yup.object({
    email:Yup.string().required("email required").email("enter valid email"),
    newPassword:Yup.string().required("newPassword required").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,"enter valid newPassword")
  });
  let LoginForm = useFormik({
    initialValues:{
      email:"",
      newPassword:"",
    },
    onSubmit:UpdatePasswordApi,
    validationSchema:validYup,
  });
 function UpdatePasswordApi(data) {
    axios .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",data).then((req)=>{
      if(req.data.token){
        navg("/login");
      }
    })
    .catch((err)=>{
      setErr(err.response.data.message);
      console.log(err.response.data.message);
    });
  }
  return (
<div>
<Helmet>
    <title>Update password</title>
  </Helmet>
<h1 className="w-7/12 mx-auto mb-3 mt-9">Update Password:</h1>
{errMessage ? (
  <div className='p-4 mb-4 w-7/12 mx-auto text-sm text-red-700 rounded-lg bg-red-50 ' role='alert'>{errMessage}</div>
  ):(
    ""
  )}
  <form onSubmit={LoginForm.handleSubmit} className="w-7/12 mx-auto my-8">
  <div className="mb-5">
      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email:</label>
      <input value={LoginForm.values.email} onChange={LoginForm.handleChange} onBlur={LoginForm.handleBlur}
      type="email" id="email" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active-500 focus:border-active-500 block w-full p-2.5"/>
         {LoginForm.touched.email && LoginForm.errors.email ?(<p className='text-red-700'>{LoginForm.errors.email}</p>):("")}
    </div>
    <div className="mb-5">
      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">New password:</label>
      <input value={LoginForm.values.newPassword} onChange={LoginForm.handleChange} onBlur={LoginForm.handleBlur}  type="password" id="newPassword" name='newPassword'
       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active-500 focus:border-active-500 block w-full p-2.5" />
       {LoginForm.touched.newPassword && LoginForm.errors.newPassword ?(<p className='text-red-700'>{LoginForm.errors.newPassword}</p>):("")}
    </div>
    
    <button disabled={!(LoginForm.isValid && LoginForm.dirty)} type="submit" className="text-white bg-active hover:bg-active focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-active disabled:bg-opacity-25">Update Password</button>
  </form>
</div>);
}
  
