import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { createContext, useEffect } from 'react'
import { useState } from 'react'
export let AuthContext=createContext()
export default function AuthContextProvider({children}){
let[token,setToken]=useState(null)
useEffect(()=>{
  let TokenStorage=localStorage.getItem("token")
  if(TokenStorage){
 setToken(TokenStorage);
  }
},[])
let [numsOfCartItems,setnumsCartItems]=useState(null)
  useEffect(()=>{
    if(localStorage.getItem('token')){
      getUserCart().then(()=>{
        setnumsCartItems(query?.data?.data?.numOfCartItems)
    
      })
    }
  })
let [numsOfWishListItems,setnumsWishListItems]=useState(null)
  useEffect(()=>{
    if(localStorage.getItem('token')){
      getUserWishList().then(()=>{
        setnumsWishListItems(query2?.data?.data?.numsOfWishListItems)
      })
    }
  })
let query =useQuery({
  queryKey:['UserCart'],
queryFn:getUserCart,
}
)  

let query2 =useQuery({
  queryKey:['UserWishList'],
queryFn:getUserWishList,
})
const headerOptions={
  headers:{
    token:localStorage.getItem('token'),
  },
};
const baseUrl  ="https://ecommerce.routemisr.com/api/v1/cart"
function getUserCart(){
return  axios.get(baseUrl,headerOptions)
}  
 function addProduct(id){
let data={
  productId: id
}
  return axios.post(baseUrl,data,headerOptions)
}  
function deleteProduct(id){
return  axios.delete(`${baseUrl}/${id}`,headerOptions)
} 
function ClearProducts(){
return  axios.delete(baseUrl,headerOptions)
} 
function UpdateCartItemCount(id,count){
  let data ={
    count:count
  }
  return axios.put(`${baseUrl}/${id}`,data,headerOptions)
}

const baseUrl2  ="https://ecommerce.routemisr.com/api/v1/wishlist"
function getUserWishList(){
return  axios.get(baseUrl2,headerOptions)
}  
function addWishListProduct(id){
    let data={
      productId: id
    }
  return axios.post(baseUrl2,data,headerOptions)
}   
function deleteWishListProduct(id){
return  axios.delete(`${baseUrl2}/${id}`,headerOptions)
} 

  return (
    <AuthContext.Provider value={{token,setToken,getUserCart,addProduct,numsOfCartItems,setnumsCartItems,deleteProduct,ClearProducts,UpdateCartItemCount,addWishListProduct,deleteWishListProduct,getUserWishList,numsOfWishListItems,setnumsWishListItems}}>{children}</AuthContext.Provider>
  )
}
