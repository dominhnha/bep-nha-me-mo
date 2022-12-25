import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useReducer } from 'react'
import {CartReducer} from '../reducers/CartReducer'
export const CartContext = createContext()

const CartContextProvider = ({children}) => {
    const [Cart,Cartdispatch] = useReducer(CartReducer,{
      success:false,
      payload:[],
    });
    const CartContextData = {
        Cart,
        Cartdispatch,
    }
  return (  
    <CartContext.Provider value={CartContextData}>
        {children}
    </CartContext.Provider>
  )
}

CartContextProvider.propTypes = {}

export default CartContextProvider;