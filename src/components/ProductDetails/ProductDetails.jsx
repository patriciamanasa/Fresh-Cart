import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContextProvider';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {
  let {addProduct,setnumsCartItems}=useContext(AuthContext)
let {id}=  useParams();
let {isLoading,data}=useQuery({
  queryKey:["productdetails",id],
  queryFn:function(){
    return  axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
}
})
function changeImage(e){
let imgSrc=e.target.getAttribute("src")
document.getElementById("myimage").setAttribute("src",imgSrc);
}
let product=data?.data?.data;
function addCart(id){
  addProduct(id).then((req)=>{
    setnumsCartItems(req.data.numsOfCartItems)
    toast.success(req.data.message)
  })
  .catch((err)=> {
    toast.error(err.response.data.message)
  });
}
return (
<>
<Helmet>
    <title>Products details</title>
  </Helmet>
<Toaster/>
  {isLoading?  <div className='bg-white flex justify-center items-center h-screen'>
<span class="loader"></span>
</div>: 
 <div className='w-10/12 h-screen mx-auto my-5'>
      <div className='flex justify-between items-center'>
      <div className='w-3/12'>
       <img src={product?.imageCover}  id="myimage"
       className='w-full object-cover mb-5 object-top' alt="" />
      <div className='flex'>
          {product?.images.map((image,i)=> {
            return (
            <div key={i}>
          <img onClick={changeImage} src={image}  className='w-full object-cover h-25' alt="" />
            </div>
            );
          })}
      </div>
      </div>
      <div className='w-8/12'>
      <h2>{product?.title}</h2>
      <p className='text-gray-500 my-5'>{product?.description}</p>
      <div className='flex justify-between'>
                <span>{product?.price}EGP</span>
                <span><i className='fa-solid fa-star text-yellow-300'></i>{" "}{product?.ratingsAverage}</span>
              </div>
              <button onClick={()=>{addCart(id)}} className='btn mt-5'>Add To Cart</button>
      </div>
    </div>
    </div>
        }
        </>
  )
}
