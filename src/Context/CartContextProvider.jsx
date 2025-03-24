import axios from 'axios'
import React, { useState } from 'react'
import { createContext } from 'react'


export let CartContext = createContext()
export default function CartContextProvider({children}) {

  return (
    <CartContext.Provider value={{getUserCart}}>
      {children}
      </CartContext.Provider>
  )
}
