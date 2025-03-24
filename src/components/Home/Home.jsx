import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import MainSlider from '../MainSlider/MainSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Context/AuthContextProvider';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function Home() {
let{addProduct,setnumsCartItems,addWishListProduct}=useContext(AuthContext) ; 
let[page,setPage]=useState(1);
function getAllProducts(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products?limit=12&page=${page}`)
}
let {data, isError, isLoading,error}= useQuery({
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
function addCart(id){
  addProduct(id).then((req)=>{
    setnumsCartItems(req.data.numsOfCartItems)
    toast.success(req.data.message)
  })
  .catch((err)=> {
    toast.error(err.response.data.message)
  });
}
function addWishList(id){
  addWishListProduct(id).then((req)=>{
    console.log('Response:', req.data);
    setnumsWishListItems(req.data.numsOfWishListItems)
    toast.success("product added to wish list")
  })
  .catch((err)=> {
    toast.error("cant add to wish list")
  });
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
  <div className='w-10/12 mx-auto my-8'>
<MainSlider/>
<CategorySlider/>
      <div className='flex flex-wrap space-y-5'>
        {data?.data?.data?.map((product)=>{ 
          let {_id,title,imageCover,price,category,ratingsAverage}=product;
          let {name}=category;
          return(
            <div key={_id}  className='lg:w-2/12 md:w-4/12 sm:w-6/12 w-full px-2'>
            <div className='item overflow-hidden group p-3 hover:border hover:border-active'>
            <button onClick={() => addWishList(_id)} className="fa-solid fa-heart"></button>
              <Link to={`/productdetails/${_id}`}>
              <img src={imageCover} className='w-full relative' alt={title} />
              <h5 className='text-active'>{name}</h5>
              <h2>{title.split(" ").slice(0,2).join(" ")}</h2>
              <div className='flex justify-between'>
                <span>{price}EGP</span>
                <span><i className='fa-solid fa-star text-yellow-300'></i>{" "}{ratingsAverage}</span>
              </div>
              </Link>
              <button onClick={()=>addCart(_id)} className='btn mt-3 duration-500 translate-y-24 group-hover:translate-y-0'>Add To Cart</button>
              
            </div>
            </div>
          );
        })}
      </div>

      

<nav aria-label="Page navigation example">
  <ul className="flex items-center -space-x-px h-8 text-sm justify-center mt-7">
    <li>
      <a  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-active dark:bg-gray-50 dark:border-gray-50 dark:text-gray-400 dark:hover:bg-active dark:hover:text-white">
        <span className="sr-only">Previous</span>
        <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 1 1 5l4 4" />
        </svg>
      </a>
    </li>
    {new Array(data?.data?.metadata?.numberOfPages)
    .fill("")
    .map((el,i)=> {
      return(  <li onClick={getPageNumber} key={el}>
      <a page={i+1}  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-active dark:bg-gray-50 dark:border-gray-50 dark:text-gray-400 dark:hover:bg-active dark:hover:text-white">{i+1} </a>
    </li>
    )})
}
  
    <li>
      <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-50 hover:text-active dark:bg-gray-50 dark:border-gray-50 dark:text-gray-400 dark:hover:bg-active dark:hover:text-white">
        <span className="sr-only">Next</span>
        <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
        </svg>
      </a>
    </li>
  </ul>
</nav>

      </div>}
    </>
  
  )
}
