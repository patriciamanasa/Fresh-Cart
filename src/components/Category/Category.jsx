import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';

export default function Category() {
  let [loading,setLoading]=useState(true);
  let [categoryList,setCategory]=useState(null)
  function GetAllCategory(){
    setLoading(true)
    axios.get("https://ecommerce.routemisr.com/api/v1/categories").then((req)=>{
      setCategory(req.data.data)
      setLoading(false)
    })  
  }
  useEffect(()=>{
    GetAllCategory();
  }, []);


if (loading){
  return <div className='bg-white flex justify-center items-center h-screen'>
  <span class="loader"></span>
  </div>
}
  return (
    <>
    <Helmet>
    <title>Category</title>
  </Helmet>
   <div  className='w-10/12 mx-auto my-9'>
   <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8'>
          {categoryList?.map((category) => {
            return (
              <div key={category._id} className='text-center'>
                <img
                  src={category.image}
                  className='w-full object-cover'
                  alt={category.name}
                />
                <h5 className='mt-3'>{category.name}</h5>
              </div>
            );
          })}
        </div>
      </div>
  </> 
  )
} 