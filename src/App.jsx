import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Product from "./components/Product/Product";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Notfound from "./components/Notfound/Notfound";
import Brand from "./components/Brand/Brand";
import Category from "./components/Category/Category";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import AuthContextProvider from "./Context/AuthContextProvider";
import ProtectedRouting from "./components/ProtectedRouting/ProtectedRouting";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ShippingDetails from "./components/ShippingDetails/ShippingDetails";
import Allorders from "./components/Allorders/Allorders";
import WishList from "./components/WishList/WishList";


export default function App() {
  let router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element:<ProtectedRouting><Home/></ProtectedRouting> },
        { path: "product", element:<ProtectedRouting><Product/></ProtectedRouting> },
        { path: "cart", element: <ProtectedRouting><Cart/></ProtectedRouting> },
        { path: "brand", element:<ProtectedRouting><Brand/></ProtectedRouting> },
        { path: "category", element:<ProtectedRouting><Category/></ProtectedRouting>},
        { path: "ShippingDetails/:id", element:<ProtectedRouting><ShippingDetails/></ProtectedRouting>},
        { path: "productdetails/:id", element:<ProtectedRouting><ProductDetails/></ProtectedRouting>},
        { path: "allorders", element:<ProtectedRouting><Allorders/></ProtectedRouting>},
        { path: "wishlist", element:<ProtectedRouting><WishList/></ProtectedRouting>},
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "updatepassword", element: <UpdatePassword/> },
        { path: "**", element: <Notfound /> },
      ],
    },
  ]);
let client = new QueryClient()
  return(
    <>
    <QueryClientProvider client={client}>
    <AuthContextProvider>
    <RouterProvider router={router}/>
  </AuthContextProvider>
  </QueryClientProvider>
  
    </>
  )
}
