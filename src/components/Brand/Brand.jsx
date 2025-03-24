import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';

export default function Brand() {
  let [loading,setLoading]=useState(true);
  let [BrandList,setBrand]=useState(null)
  function GetAllBrand(){
    setLoading(true)
    axios.get("https://ecommerce.routemisr.com/api/v1/brands").then((req)=>{
      setBrand(req.data.data)
      setLoading(false)
    })
  }
  useEffect(()=>{
    GetAllBrand();
  }, []);
  
  if (loading){
    return <div className='bg-white flex justify-center items-center h-screen'>
    <span class="loader"></span>
    </div>
  }
  return (
    <>
    <Helmet>
    <title>Brands</title>
  </Helmet>
        <div className='w-8/12 md:w-full mx-auto my-9'>
        {BrandList?.map((Brand)=>{
          return(
            <div className='inline-flex   m-9 '>
     <div key={Brand._id}>
     <img src={Brand.image} className='w-full object-cover h-40' alt="" />
    </div>
    </div>
      );
    })}
    </div>
    </>
  )
}
