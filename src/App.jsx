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

export default function App() {
  let router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element:<ProtectedRouting><Home /></ProtectedRouting> },
        { path: "product", element:<ProtectedRouting> <Product /></ProtectedRouting> },
        { path: "cart", element: <ProtectedRouting><Cart /></ProtectedRouting> },
        { path: "brand", element:<ProtectedRouting><Brand /></ProtectedRouting> },
        { path: "category", element:<ProtectedRouting><Category /> </ProtectedRouting>},
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "updatepassword", element: <UpdatePassword/> },
        { path: "**", element: <Notfound /> },
      ],
    },
  ]);
  return <AuthContextProvider>
    <RouterProvider router={router}/>
  </AuthContextProvider>;
}
