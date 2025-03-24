import React from 'react'
import img  from '../../assets/images/Amazon_Pay_logo.svg.png'
import img1  from '../../assets/images/klipartz.com1.png'
import img2  from '../../assets/images/master-card-logo-png_seeklogo-89117.png'
import img3  from '../../assets/images/klipartz.com.png'
import img4  from '../../assets/images/klipartz.com3.png'
import img5  from '../../assets/images/klipartz.com2.png'
export default function Footer() {
  return (
  
    <div className='bg-gray-100 p-5'>
      <div className='lg:w-10/12 mx-auto m-5'>
      <h3 className='text-xl mb-3'>Get the FreshCart app</h3>
      <p className="text-gray-500 mb-3">we will send you a link,open it on yor phone to download the app.</p>
      <div className='flex justify-between mb-3'>
      <div className='lg:w-9/12'>
       <input className=" bg-white border border-gray-300 text-gray-900 lg:text-sm rounded-lg focus:ring-active-500 focus:border-active-500 block w-full p-2" placeholder='Email....'></input>
       </div>
       <div className='lg:w-2/12'>
       <button className='btn h-9 text-xs md:text-lg  '>Share App Link</button>
       </div>
      </div>
      <div className='divide-y-2 divide-gray-800'>
        <div className='lg:flex justify-between sm:flex-wrap'>
  <div className='lg:w-5/12 flex items-center'>
  <h1 className='text-sm'>Payment Partners </h1>
      <img src={img} className='w-11 ms-3' alt="" />
      <img src={img1} className='w-11 ms-3' alt="" />
      <img src={img2} className='w-11 ms-3' alt="" />
      <img src={img3} className='w-11 ms-3' alt="" />
      </div>
    <div className='lg:w-5/12 flex items-center'>
    <h1 className='text-sm'>Get deliveries with FreshCart </h1> 
      <img src={img4} className='w-24 ms-2 ' alt="" />
      <img src={img5} className='w-24 ms-2 ' alt="" />
      </div>
      </div>
    </div>
    </div>
  </div>
    

  )
}
