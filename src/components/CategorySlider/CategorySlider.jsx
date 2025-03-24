import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'

export default function CategorySlider() {
  let [categoryList,setCategory]=useState(null)
  function GetAllCategory(){
    axios.get("https://ecommerce.routemisr.com/api/v1/categories").then((req)=>{
      setCategory(req.data.data)
    })
  }
  useEffect(()=>{
    GetAllCategory();
  }, []);
  return (
    <div className='my-3'>
      <Slider slidesToShow={6} slidesToScroll={3} infinite autoplay speed={500}  >
        {categoryList?.map((category)=>{
          return(
     <div key={category._id} >
     <img src={category.image} className='w-full object-cover h-48' alt="" />
     <h6 id='h6' className='text-left'>{category.name}  </h6>
    </div>);
        })} 
      </Slider>
    </div>
  )
}
