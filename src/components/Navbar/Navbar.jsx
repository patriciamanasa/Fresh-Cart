import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logoImg from '../../assets/images/freshcart-logo.svg'
import  { AuthContext } from '../../Context/AuthContextProvider'

export default function Navbar() {
  let {token,setToken}=useContext(AuthContext);
  let {numsOfCartItems,numsOfWishListItems}=useContext(AuthContext);
  let navg= useNavigate()
  function Logout(){
localStorage.removeItem("token");
setToken(null)
navg("/login")
  }
  return (
<nav className="bg-white border-gray-200 shadow">
  <div className="max-w-screen-xl flex justify-between flex-wrap items-center mx-auto p-4">
    <Link to='' className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={logoImg} className="h-8" alt="" />
      
    </Link>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className="hidden justify-between gap-64  w-full md:flex md:w-auto" id="navbar-default">
{ token ? (
  <div className=''>
   <ul className="font-medium flex flex-col mp-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row  md:mt-0 md:border-0 md:bg-white ">
        <li>
          <NavLink to="" className="block py-2 px-3" aria-current="page">Home</NavLink>
        </li>
        <li>
          <NavLink to="/product" className="block py-2 px-3">Products</NavLink>
        </li>
        <li>
          <NavLink to="/brand" className="block py-2 px-3 ">Brands</NavLink>
        </li>
        <li>
          <NavLink to="/category" className="block py-2 px-3">Categorys</NavLink>
        </li>
        <li>
          <NavLink to="/cart" className="block py-2 px-3 ">Cart</NavLink>
        </li>
      </ul>
      </div>
    )  :(
        ""
      )}  
      <ul className="font-medium flex  flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row  md:mt-0 md:border-0 md:bg-white ">
        <li>
          <Link to="https://www.facebook.com/" className="block py-2 px-3" aria-current="page"><i class="fa-brands fa-facebook"></i></Link>
        </li>
        <li>
          <Link to="https://x.com/" className="block py-2 px-3"><i class="fa-brands fa-twitter"></i></Link>
        </li>
        <li>
          <Link to="https://www.instagram.com/" className="block py-2 px-3 "><i class="fa-brands fa-instagram"></i></Link>
        </li>
        <li>
          <Link to="https://tiktok.com/" className="block py-2 px-3 "><i class="fa-brands fa-tiktok"></i></Link>
        </li>
        <li>
          <Link to="https://www.linkedin.com/" className="block py-2 px-3"><i class="fa-brands fa-linkedin"></i></Link>
        </li>
        <li>
          <Link to="https://www.youtube.com/" className="block py-2 px-3"><i class="fa-brands fa-youtube"></i></Link>
        </li>
        {token ?
        <div className='flex'>
          <li className='relative'>
          <Link to="/cart" className="block py-2 px-3"  ><i class="fa-solid fa-cart-shopping text-active"></i></Link>
        <span className='absolute text-active top-0 end-0 -translate-y-2 translate-x'>{numsOfCartItems}</span>
        </li>
          <li className='relative'>
          <Link to="/wishlist" className="block py-2 px-3"  ><i class="fa-solid fa-heart text-active"></i></Link>
        <span className='absolute text-active top-0 end-0 -translate-y-2 translate-x'>{numsOfWishListItems}</span>
        </li>
        </div>
        :(
          ""
        )}
      

        {token ?  <li onClick={Logout}>
          <span className="block py-2 px-3">Logout</span>
        </li>
        :(
        <>
        <li>
          <NavLink to="/login" className="block py-2 px-3">Login</NavLink>
        </li>
        <li>
          <NavLink to="/signup" className="block py-2 px-3">Signup</NavLink>
        </li>
        </>
        )}
      </ul>
  
    </div>
  </div>
</nav>

  )
}
