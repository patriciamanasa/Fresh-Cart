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
    if(req.data && req.data.data && req.data.data.length > 0){
      setWishlistData(req.data.data);
    }else{
      setWishlistData([])
    }
    setLoading(false)
  }).catch(()=>{
    setLoading(false)
  })
}
function removeItem(id) {
    deleteWishListProduct(id)
      .then(() => {
        toast.success("Product Removed");
        setWishlistData(prev => prev.filter(item => item._id !== id)); 
        setnumsWishListItems(prev => Math.max(prev - 1, 0));
        getWishListData(); 
      })
      .catch(() => {
        toast.error("Can't Remove Product");
      });
  }
  useEffect(() => {
    console.log('Current wishlistdata:', wishlistdata); 
  }, [wishlistdata]);
  

if (loading){
  return <div className='bg-white flex justify-center items-center h-screen'>
  <span className="loader"></span>
  </div>
}
return(
  <>
  <Helmet>
    <title>Wish list</title>
  </Helmet>
  <Toaster/>
  {Array.isArray(wishlistdata) && wishlistdata?.length>0?   <div className='w-10/12 mx-auto my-5'>
  <div className='flex justify-between items-right'>
  <h1 className='text-2xl'>Wish List</h1>
  </div>
<div className='divide-y-2 divide-gray-100'>
{wishlistdata.map((item)=>{

return <div key={item._id}  className='flex items-center py-3'>
<div className='w-full sm:w-8/12 md:w-9/12'>
<div className='flex justify-center items-center'>
  <div className='w-1/4 md:w-1/6'>
  <img src={item.imageCover} className="w-full" alt="" /></div>
  <div className='w-3/4 md:w-5/6 pl-4'>
  <h2 className='text-lg md:text-xl'>Title:{item.title}</h2>
  <h2 className='mt-3 text-active mb-2'>Price:{item.price} EGP</h2>

  </div>
  </div>
  </div>
<div className='w-full sm:w-4/12 md:w-3/12 flex justify-center items-center mt-3 sm:mt-0'>
<button onClick={()=>{removeItem(item._id)}} className='border border-red-600 px-3 rounded py-2 text-red-600 hover:bg-red-600 hover:text-white'><i className='fa-solid fa-heart-crack mr-2'>
</i>Remove</button>
</div>
</div>
})}
    </div>
    <br/>
  
<Link to={'/ShippingDetails/'+wishlistdata} className='btn block text-center'>Pay <i className="fa-brands fa-cc-visa"></i></Link>   
    </div>:
    <div className='text-red-600 text-center h-screen'>
      No Data</div>
      }
  
  </>
)}