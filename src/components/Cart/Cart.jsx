import React, {  useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContextProvider';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Cart() {
let {getUserCart,deleteProduct,setnumsCartItems,ClearProducts,UpdateCartItemCount}=useContext(AuthContext);
let [cartData,setCartData]=useState(null);
let [loading,setLoading]=useState(true);
useEffect(()=>{
getCartData();
},[]);
function getCartData(){
  setLoading(true)
  getUserCart().then((req)=>{
    setCartData(req.data.data);
    setLoading(false)
  }).catch((err)=>{
    console.log(err);
    setLoading(false)
  })
}
function removeItem(id){
  deleteProduct(id).then((Req)=>{
setnumsCartItems(Req.data.numsOfCartItems)
setCartData(Req.data.data)
toast.success("Product Removed")
  })
  .catch((err)=>{
    setnumsCartItems(err.statusMsg)
    toast.error("Cant Remove Product")
  });
}
function ClearItems(){
ClearProducts().then((req)=>{
if(req.data.message == 'success'){
  setCartData(null)
  setnumsCartItems(null)
  toast.success('Empty Cart')
}
}).catch((err)=>{  
  setnumsCartItems(err.statusMsg)
  toast.error('Cant Clear Cart')
  }
)
}
function UpdateCount(id,count){
  UpdateCartItemCount(id,count).then((req)=>{
 setCartData(req.data.data)
  })
  .catch((err)=>{
    setnumsCartItems(err.statusMsg)
    toast.error('Cant add or remove item')
  })
}
if (loading){
  return <div className='bg-white flex justify-center items-center h-screen'>
  <span class="loader"></span>
  </div>
}
return(
  <>
  <Helmet>
    <title>Cart</title>
  </Helmet>
  <Toaster/>
  {cartData?.products.length>0?   <div className='w-10/12 mx-auto my-5'>
    <h1 className='text-2xl'>Shop Cart</h1>
  <div className='flex justify-between items-center'>
  <h2 className='text-xl text-active'>Total Cart Price:{cartData.totalCartPrice}</h2>
<button onClick={ClearItems} className='bg-red-600 text-white px-3 py-2 mr-4 rounded '>Clear Cart</button>
  </div>
<div className='divide-y-2 divide-gray-100'>
{cartData.products.map((item)=>{
return <div key={item._id}  className='flex items-center py-3'>
<div className='w-10/12'>
<div className='flex justify-around'>
  <div className='w-1/12'>
  <img src={item.product.imageCover} className="w-full" alt="" /></div>
  <div className='w-10/12'>
  <h2>Title:{item.product.title}</h2>
  <h2 className='mt-3 text-active mb-2'>Price:{item.price} EGP</h2>
  <button onClick={()=>{removeItem(item.product._id)}} className='border border-red-600 px-3 rounded py-2 text-red-600 hover:bg-red-600 hover:text-white'><i className='fa-solid fa-trash-can mr-2'>
    </i>Remove</button>
  </div>
  </div>
  </div>
<div className='w-2/12'>
<i onClick={()=>{UpdateCount(item.product._id,item.count+1)}} className='border cursor-pointer rounded border-active p-2 fa-solid fa-plus'></i>
<span className='mx-2'>{item.count}</span>
<i onClick={()=>{UpdateCount(item.product._id,item.count - 1)}} className='border cursor-pointer rounded border-active p-2 fa-solid fa-minus'></i>
</div>
</div>
})}
    </div>
    <br/>
<Link to={'/ShippingDetails/'+cartData._id} className='btn block text-center'>Pay <i className="fa-brands fa-cc-visa"></i></Link>    
    </div>:
    <div className='text-red-600 text-center h-screen'>
      No Data</div>
      }
  
  </>
)}