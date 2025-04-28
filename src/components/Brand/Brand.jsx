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
  <div className='w-10/12 mx-auto my-9'>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {BrandList?.map((Brand) => {
            return (
              <div key={Brand._id} className="flex justify-center items-center">
                <img
                  src={Brand.image}
                  className="w-full object-contain h-40"
                  alt={Brand.name}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
}
