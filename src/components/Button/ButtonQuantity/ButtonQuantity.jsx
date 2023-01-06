import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import "./ButtonQuantity.scss";
import { useRef } from 'react';

const ButtonQuantity = props => {
    
    const quantity = props.quantity ? props.quantity : null;

    const setQuantity = props.setQuantity ? props.setQuantity : null;
    // quantity
    const decrease = (e)=>{
        e.preventDefault() 
        setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
    }
    const increase = (e)=>{
        e.preventDefault() 
        console.log(quantity)
        setQuantity(+quantity >= 1000 ? +quantity :  Number(+quantity + 1) )
    }
    //preventDefault
    const refButtonQuantity = useRef(null);
    console.log("quantity", typeof( quantity))
    return (
    <div className='ButtonQuantity' ref={refButtonQuantity}>
        <div className="ButtonQuantity__decrease " onClick={(e)=>decrease(e)}>
            <i class='bx bx-message-square-minus'></i>
        </div>
        <div className="ButtonQuantity__content ">
                 {/* {quantity} */}
                 <input type="number" 
                    onChange={(e)=>setQuantity(e.target.value)} 
                    value={quantity} />   
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