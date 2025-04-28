import axios from 'axios';
import React, { useState } from 'react'
import MainSlider from '../MainSlider/MainSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import Product from '../Product/Product';

export default function Home() {
let[page,setPage]=useState(1);
function getAllProducts(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products?limit=12&page=${page}`)
}
let { isError, isLoading,error}= useQuery({
  queryKey:['products',page],
queryFn:getAllProducts,
})
function getPageNumber(e){
  let page = e.target.getAttribute("page")
  setPage(page);
    }
if(isError)  {
  return <h2 className='text-red-600'>
{error.response.data.message}
  </h2>
}


  return (
    <>
    <Helmet>
    <title>Home</title>
  </Helmet>
    <Toaster/>
    {isLoading ? <div className='bg-white flex justify-center items-center h-screen'>
<span class="loader"></span>
</div>: 
  <div className='w-11/12 mx-auto my-8'>
<MainSlider/>
<CategorySlider/>
</div>}
        <div className='mx-auto my-8'>
        <Product/></div>
    </>
  
  )
}
