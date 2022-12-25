import React from 'react'
import PropTypes from 'prop-types'
import { useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import "./CartItem.scss"
import { GetProductById } from '../../services/Product/Product';
const CartItem = props => {
    const product = props.product ? props.product : null;
    const checked = props.checked ? true : false;
    //const [checked,setChecked] = useState(false);
    const handleChecked = props.handleReducerChecked ? props.handleReducerChecked  :null;
    const [currentProduct,setCurrentProduct] = useState(null);
    const [Loading,setLoading] = useState(true);


    useEffect(()=>{
        //setChecked(props.checked ? props.checked : false)
    },[props.checked])
    const handleOnchange = useCallback((e)=>{
        handleChecked(checked,product)
    },[props.checked,product]) 

    // useEffect(()=>{
    //     //get data in API
    //     try{
    //         const getProduct = async()=>{
    //             const data = await GetProductById(product.Pid);
    //             console.log(data);
    //             setCurrentProduct("oke",data.payload)
    //         } 
    //         getProduct();
    //     }catch(e){
    //         console.log(e)
    //     }finally{
    //         setLoading(false);
    //     }
    // },[])
    console.log(checked,product)
  return (
    <div className='Cart__item'  onClick={(e)=>handleOnchange(e)}>
        <div className="Cart__item__checkbox">
            <input 
                type="checkbox"  
                className="Cart__item__input" 
                checked={checked}
                onClick={null}
               
            />
        </div>
        <div className="Cart__item__image">
            <img src="" alt="" />
        </div>
    </div>
  )
}

CartItem.propTypes = {}

export default CartItem