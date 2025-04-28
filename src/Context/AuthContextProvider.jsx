import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { createContext, useEffect } from 'react'
import { useState } from 'react'
export let AuthContext=createContext()
export default function AuthContextProvider({children}){
let[token,setToken]=useState(null)
 useEffect(()=>{
  const TokenStorage=localStorage.getItem("token")
  if(TokenStorage){
 setToken(TokenStorage);
  }
},[])

const query =useQuery({
  queryKey:['UserCart'],
queryFn:getUserCart,
}
) ; 

function refreshUserCart() {
  getUserCart()
    .then((res) => {
      const products = res.data.data?.products || [];
      setnumsCartItems(products.length);
    })
    .catch((err) => {
      console.log('Error refreshing cart', err);
    });
}

let [numsOfCartItems,setnumsCartItems]=useState(null)
   useEffect(() => {
    const storedCartItems = localStorage.getItem('numOfCartItems')
    if (storedCartItems) {
      setnumsCartItems(Number(storedCartItems))
    } else {
      setnumsCartItems(query?.data?.data?.numOfCartItems)
    }
  }, [])

  useEffect(() => {
    if (numsOfCartItems !== null) {
      localStorage.setItem('numOfCartItems', numsOfCartItems)
    }
  }, [numsOfCartItems])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUserCart().then((res) => {
        const products = res.data.data?.products || [];
        setnumsCartItems(products.length);
      });
    }
  }, [query])
  

  const [numsOfWishListItems, setnumsWishListItems] = useState(null)
  const [wishListProducts, setWishListProducts] = useState([])

  useEffect(() => {
    const storedWishList = localStorage.getItem('wishList')
    if (storedWishList) {
      const parsedWishList = JSON.parse(storedWishList)
      setWishListProducts(parsedWishList)
      setnumsWishListItems(parsedWishList.length)
    }
  }, [])

  useEffect(() => {
    if (token) {
      getUserWishList().then((res) => {
        const products = res.data.data
        const wishlistProductIds = products.map((product) => product.id)
        setnumsWishListItems(wishlistProductIds.length)
        setWishListProducts(products)
        localStorage.setItem('wishList', JSON.stringify(products))
      })
    }
  }, [token])


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
    <AuthContext.Provider value={{token,setToken,getUserCart,addProduct,numsOfCartItems,setnumsCartItems,deleteProduct,ClearProducts,UpdateCartItemCount,addWishListProduct, deleteWishListProduct,getUserWishList,numsOfWishListItems,setnumsWishListItems, ClearProducts, UpdateCartItemCount,}}>{children}</AuthContext.Provider>
  )
}
