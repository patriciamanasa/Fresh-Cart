import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"
export default function ForgetPassword() {
  let navg =useNavigate()
  let[errMessage,setErr]=useState(null);
  let[formDisplay,setformDisplay]=useState(true);
  let validYup=Yup.object({
    email:Yup.string().required("email required").email("enter valid email"),
  });
  let valid2Yup=Yup.object({
    resetCode:Yup.string().required("resetCode required"),
  });
  let ForgetForm= useFormik({
    initialValues:{
      email:"",
    },
    onSubmit:ForgetPasswordApi,
    validationSchema:validYup,
  });
  let VerifyResetcodeForm= useFormik({
    initialValues:{
      resetCode:"",
    },
    onSubmit:VerifyResetcodeApi,
    validationSchema:valid2Yup,
  });
function VerifyResetcodeApi(data){
  axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",data).then((req)=>{
      if(req.data.status =="Success"){
        navg('/updatepassword')
      }
    })
    .catch((err)=>{
      setErr(err.response.data.message);
    });
}
 function ForgetPasswordApi(data) {
    axios .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",data).then((req)=>{
      if(req.data.statusMsg =="success"){
        setformDisplay(false)
      }
    })
    .catch((err)=>{
      setErr(err.response.data.message);
    });
  }
  return (
    <>
{formDisplay ? <div>
<h1 className="w-7/12 mx-auto mb-3 mt-3">Forget Password:</h1>
{errMessage ? (
  <div className='p-4 mb-4 w-7/12 mx-auto text-sm text-red-700 rounded-lg bg-red-50 ' role='alert'>{errMessage}</div>
  ):(
    ""
  )}
  <form onSubmit={ForgetForm.handleSubmit} className="w-7/12 mx-auto">
  <div className="mb-5">
      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email:</label>
      <input value={ForgetForm.values.email} onChange={ForgetForm.handleChange} onBlur={ForgetForm.handleBlur}
      type="email" id="email" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active-500 focus:border-active-500 block w-full p-2.5"/>
         {ForgetForm.touched.email && ForgetForm.errors.email ?(<p className='text-red-700'>{ForgetForm.errors.email}</p>):("")}
    </div>
    
    <button disabled={!(ForgetForm.isValid && ForgetForm.dirty)} type="submit" className="text-white bg-active hover:bg-active focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-active disabled:bg-opacity-25">Send</button>
  </form>
</div>
 :
<div>
<h1 className="w-7/12 mx-auto mb-3 mt-3">Reset Code</h1>
{errMessage ? (
  <div className='p-4 mb-4 w-7/12 mx-auto text-sm text-red-700 rounded-lg bg-red-50 ' role='alert'>{errMessage}</div>
  ):(
    ""
  )}
  <form onSubmit={VerifyResetcodeForm.handleSubmit} className="w-7/12 mx-auto">
  <div className="mb-5">
      <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900">ResetCode:</label>
      <input value={VerifyResetcodeForm.values.email} onChange={VerifyResetcodeForm.handleChange} onBlur={VerifyResetcodeForm.handleBlur}
      type="string" id="resetCode" name='resetCode' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active-500 focus:border-active-500 block w-full p-2.5"/>
         {VerifyResetcodeForm.touched.resetCode && VerifyResetcodeForm.errors.resetCode ?(<p className='text-red-700'>{VerifyResetcodeForm.errors.resetCode}</p>):("")}
    </div>
    
    <button disabled={!(VerifyResetcodeForm.isValid && VerifyResetcodeForm.dirty)} type="submit" className="text-white bg-active hover:bg-active focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-active disabled:bg-opacity-25">Vefiy Code</button>
  </form>
</div> }
</>
);
}
