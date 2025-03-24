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
   <div  className='w-8/12 md:w-11/12 mx-auto my-9'>
      {categoryList?.map((category)=>{
        return(
        
          <div className='inline-flex m-8'>
   <div key={category._id}>
   <img src={category.image} className='w-full object-cover h-48' alt="" />
   <h5 className='text-center'>{category.name}</h5>
  </div>
  </div>

  );
      })}
  </div>
  </>  
  )
} 