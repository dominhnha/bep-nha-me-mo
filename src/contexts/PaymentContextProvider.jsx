import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useReducer } from 'react'
import {PaymentReducer} from '../reducers/PaymentReducer'
export const PaymentContext = createContext()

const CartContextProvider = ({children}) => {
    const [Payment,Paymentdispatch] = useReducer(PaymentReducer,{
      success:false,
      payload:[],
    });
    const PaymentContextData = {
        Payment,
        Paymentdispatch,
    }
  return (  
    <PaymentContext.Provider value={PaymentContextData}>
        {children}
    </PaymentContext.Provider>
  )
}

CartContextProvider.propTypes = {}

export default CartContextProvider;