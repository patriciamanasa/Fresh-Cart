import React from 'react'
import Cart from '../Cart/Cart'
import { Helmet } from 'react-helmet'

export default function Allorders() {
  return (
  <>
  <Helmet>
    <title>All Orders</title>
  </Helmet>
    <div className='h-screen'><Cart/></div>
  </>
  )
}
