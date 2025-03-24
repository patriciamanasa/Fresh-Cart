import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom'
import * as Yup from "yup";

export default function ShippingDetails() {
  let validYup = Yup.object({
    details: Yup.string()
      .required("details required")
      .min(3, "min char 2")
      .max(20, "max char 20 "),
    city: Yup.string().required("city required"),
    phone: Yup.string()
      .required("phone number required")
      .matches(/^(20)?01[1250][0-9]{8}$/, "enter valid number"),
  });
let {id}= useParams();
const headerOptions={
  headers:{
    token:localStorage.getItem("token"),
  }}
let shippingFormik= useFormik({
  initialValues:{
    city:"",
    details:"",
    phone:""
  },
onSubmit:checkOutSession,
validationSchema: validYup,
})
function checkOutSession(values){
  let data ={
    shippingAddress:values
  }
axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/67b784d1d6327c5081738d0f?url=http://localhost:5173`,data,headerOptions).then((req)=>{
window.open(req.data.session.url,"_self");
console.log(req.data.session.url)
})
}
  return (
    <>
    <Helmet>
      <title>Shipping details</title>
    </Helmet>
    <div className='w-7/12 mx-auto my-6'>
    <h1 className='text-2xl mb-5'>Shipping Details</h1>
    <form onSubmit={shippingFormik.handleSubmit}>
    <div className="mb-5">
      <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900">Your details:</label>
      <input value={shippingFormik.values.details} onChange={shippingFormik.handleChange} onBlur={shippingFormik.handleBlur}
      type="text" id="details" name='details' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active-500 focus:border-active-500 block w-full p-2.5"/>
         {shippingFormik.touched.details && shippingFormik.errors.details ?(<p className='text-red-700'>{shippingFormik.errors.details}</p>):("")}
    </div>
    <div className="mb-5">
      <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">Your city:</label>
      <input value={shippingFormik.values.city} onChange={shippingFormik.handleChange} onBlur={shippingFormik.handleBlur}
      type="text" id="city" name='city' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active-500 focus:border-active-500 block w-full p-2.5"/>
         {shippingFormik.touched.city && shippingFormik.errors.city ?(<p className='text-red-700'>{shippingFormik.errors.city}</p>):("")}
    </div>
    <div className="mb-5">
      <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Your phone:</label>
      <input value={shippingFormik.values.phone} onChange={shippingFormik.handleChange} onBlur={shippingFormik.handleBlur}
      type="tel" id="phone" name='phone' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active-500 focus:border-active-500 block w-full p-2.5"/>
         {shippingFormik.touched.phone && shippingFormik.errors.phone ?(<p className='text-red-700'>{shippingFormik.errors.details}</p>):("")}
    </div>
    <button className='btn'   
    disabled={!(shippingFormik.isValid && shippingFormik.dirty)}
          type="submit">Pay <i className="fa-brands fa-cc-visa"></i></button>
    </form>
    </div>
    </>
  )
}
