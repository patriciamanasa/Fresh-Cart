import React, {  useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContextProvider';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function WishList() {
let {getUserWishList,deleteWishListProduct,setnumsWishListItems}=useContext(AuthContext);
let [wishlistdata,setWishlistData]=useState(null);
let [loading,setLoading]=useState(true);
useEffect(()=>{
getWishListData();
},[]);
function getWishListData(){
  setLoading(true)
  getUserWishList().then((req)=>{
    setWishlistData(req.data.data);
    setLoading(false)
  }).catch((err)=>{
    console.log(err);
    setLoading(false)
  })
}
function removeItem(id){
deleteWishListProduct(id).then((Req)=>{
setnumsWishListItems(Req.data.numsOfCartItems)
setWishlistData(Req.data.data)
toast.success("Product Removed")
  })
  .catch((err)=>{
    setnumsWishListItems(err.statusMsg)
    toast.error("Cant Remove Product")
  });
}


if (loading){
  return <div className='bg-white flex justify-center items-center h-screen'>
  <span class="loader"></span>
  </div>
}
return(
  <>
  <Helmet>
    <title>Wish list</title>
  </Helmet>
  <Toaster/>
  {wishlistdata?.products?.length>0?   <div className='w-10/12 mx-auto my-5'>
  <div className='flex justify-between items-right'>
  <h1 className='text-2xl'>Wish List</h1>
  </div>
<div className='divide-y-2 divide-gray-100'>
{wishlistdata.products.map((item)=>{
return <div key={item._id}  className='flex items-center py-3'>
<div className='w-10/12'>
<div className='flex justify-around'>
  <div className='w-1/12'>
  <img src={item.product.imageCover} className="w-full" alt="" /></div>
  <div className='w-10/12'>
  <h2>Title:{item.product.title}</h2>
  <h2 className='mt-3 text-active mb-2'>Price:{item.price} EGP</h2>

  </div>
  </div>
  </div>
<div className='w-2/12'>
<button onClick={()=>{removeItem(item.product._id)}} className='border border-red-600 px-3 rounded py-2 text-red-600 hover:bg-red-600 hover:text-white'><i className='fa-solid fa-heart-crack mr-2'>
</i>Remove</button>
</div>
</div>
})}
    </div>
    <br/>
<Link to={'/ShippingDetails/'+wishlistdata._id} className='btn block text-center'>Pay <i className="fa-brands fa-cc-visa"></i></Link>    
    </div>:
    <div className='text-red-600 text-center h-screen'>
      No Data</div>
      }
  
  </>
)}