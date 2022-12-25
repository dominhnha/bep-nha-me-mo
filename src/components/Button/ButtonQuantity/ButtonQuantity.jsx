import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import "./ButtonQuantity.scss";
import { useRef } from 'react';

const ButtonQuantity = props => {
    
    const quantity = props.quantity ? props.quantity : 1;
    const setQuantity = props.setQuantity ? props.setQuantity : null;
    // quantity
    const decrease = (e)=>{
        e.preventDefault() 
        setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
    }
    const increase = (e)=>{
        e.preventDefault() 
        setQuantity(quantity + 1)
    }
    //preventDefault
    const refButtonQuantity = useRef(null);
    console.log(refButtonQuantity)
  return (
    <div className='ButtonQuantity' ref={refButtonQuantity}>
        <div className="ButtonQuantity__decrease " onClick={(e)=>decrease(e)}>
            <i class='bx bx-message-square-minus'></i>
        </div>
        <div className="ButtonQuantity__content ">
                 {quantity}   
        </div>
        <div className="ButtonQuantity__increase " onClick={(e)=>increase(e)}>
            <i className='bx bx-message-square-add'></i>
        </div>
    </div>
    
  )
}

ButtonQuantity.propTypes = {
    
}

export default ButtonQuantity