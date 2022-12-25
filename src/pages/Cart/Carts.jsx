import React from 'react'
import PropTypes from 'prop-types'
import './Cart.scss'
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContextProvider';
import { useState } from 'react';
import Section, { SectionBody, SectionTitle } from '../../components/Section/Section';
import { useCallback } from 'react';
import { toast } from "react-toastify";
import { useEffect } from 'react';
import { PaymentContext } from '../../contexts/PaymentContextProvider';
import { CART__DECREMENT, CART__INCREMENT, CART__REMOVE, PAYMENT__SET } from '../../reducers/type';
import Sea from '../../components/Animation/Sea/Sea'
import { useNavigate } from 'react-router';
import {formatNumber } from '../../utils/Format'
const Carts = props => {
  const history = useNavigate();
  const {Cart,Cartdispatch} = useContext(CartContext);
  const { Payment,Paymentdispatch} = useContext(PaymentContext);
  const [ListProduct,SetListProduct] = useState([]);
  const [checked, setChecked] = useState([]);
  const [total, setTotal] = useState(0);
  // set top 0 
  useEffect(()=>{
    window.scrollTo(0,0);
   },[])
  // get data by cart 
  useEffect(()=>{
    if(Cart.success == true  && Cart.payload.length > 0 ){
      SetListProduct(Cart.payload)
    }else{
      SetListProduct([])
    }
  },[Cart])

  // set checked event
 const handleCheckboxChange = (e) => {
    let copyArrChecked = [...checked];
    if (e.target.checked) {
      copyArrChecked = [...checked, e.target.value];
    } else {
      copyArrChecked.splice(checked.indexOf(e.target.value), 1);
    }
    setChecked(copyArrChecked);
  };
  // delete product by cart user
  const handleDeleteProductCart = (e,productId) => {
    // code here
    e.preventDefault() 

    try{
      toast.warn(`Xóa thành công ${productId}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      Cartdispatch({
        type:CART__REMOVE,
        payload:productId
      })
    }catch(e){
      console.log(e)
    }
  };
  // + 1 quantity of products
  const handleIncrementProductCart = (e,productId) => {
    // code here
    e.preventDefault() 
    try{
      Cartdispatch({
        type:CART__INCREMENT,
        payload:productId
      })
      console.log("Cart ddddddddd",Cart)
    }catch(e){
      console.log(e)
    }
  };
  //- 1 quantity of products
  const handleDecrementProductCart = (e,productId) => {
    // code here
    e.preventDefault() 
    try{
      Cartdispatch({
        type:CART__DECREMENT,
        payload:productId
      })
    }catch(e){
      console.log(e)
    }
  };
  // set Payment provider 
  useEffect(()=>{
    // get Data is here 
    try{
      const initPayment = ListProduct.filter((item) => checked.includes(item.Pid))
      let countPayment = 0;
      initPayment.forEach(item=>{
        const count = parseInt(item.Price) * item.Quantity;
        console.log(count)
        countPayment += count;
      })
      setTotal(countPayment);
      Paymentdispatch({
        type:PAYMENT__SET,
        payload:initPayment
      })
    }catch(e){
      console.log(e)
    }
    
  },[checked,ListProduct,Cart])

  const handlePayment = useCallback(
    (e)=>{
      e.preventDefault();
      if(checked.length <=0){
        toast.error('Chọn sản phẩm trước khi thanh toán nhé !', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          return;
      }else{
        history("/Product/Payment")
      }
      
    },[checked]
  )
  console.log("Pay",Payment)
  console.log("Cart",Cart)
  return(
    <div className="Cart">
      <div className="container">
        <div className="Cart__list">
          <div className="Cart__list__warpper">
          {
            ListProduct.length > 0 
             ? ListProduct.map((item)=>{
                 const total = formatNumber(Number(item.Price)) 
                return(
                  <label 
                    className="Cart__item"  
                    htmlFor={`${item.Pid}`} 
                    key={`${item.Pid}`}
                    
                  >
                    <div className="Cart__container ">
                        <div className="Cart__checkbox">
                          <input
                              type="checkbox"
                              id={item.Pid}
                              value={item.Pid}
                              name={item.Pid}
                              onChange={handleCheckboxChange}
                          />
                        </div>
                        <div className="Cart__container__sub">
                          <div className="Cart__Image">
                            <img src={item.Image[0]} alt="" />
                          </div>
                          <div className="Cart__warpper">
                            <p> ID:{item.Pid}</p>
                            <h2>Tên:{item.NameProduct}</h2>
                            <p>Giá: <span>{formatNumber(total)}₫</span></p>
                          </div>
                        </div>
                        
                      </div>
                      <div className="Cart__container">
                        <div className="Cart__button">
                          <div className="Cart__button__quantity">
                            <div className="Cart__Decrement" onClick={(e)=>handleDecrementProductCart(e,item.Pid)}>
                              <i class='bx bx-message-square-minus'></i>
                            </div>
                            <div className="Cart__number">
                              {
                                item.Quantity
                              }
                            </div>
                            <div className="Cart__Increment" onClick={(e)=>handleIncrementProductCart(e,item.Pid)}>
                              <i className='bx bx-message-square-add'></i>
                            </div>
                            
                        </div>
                        <div className="Cart__button__delete" onClick={(e)=>handleDeleteProductCart(e,item.Pid)}>
                          <i class='bx bx-trash-alt'></i>
                        </div>
                        </div>
                    </div>
                    
                  </label>
                )
             })
             :<div className='Cart__404'>
                <Sea/>
                <h2>Bạn chưa mua chiếc bánh nào ?</h2>
                <p>Cùng quay lại mua sắm ngay</p>
             </div>
          }
          </div>
        
          <div className="Cart__payment">
            <div className="Cart__payment__list">
              <div className="Cart__payment__animation">
                
              </div>
              <div className="Cart__payment__warpper">
                <h2>Tổng Tiền</h2>
                {
                  Payment.success == true 
                  ? <span>{
                     formatNumber(total)
                    }₫</span>
                  : <span>0₫</span>
                }
                <a href="" className="Cart__payment__button" onClick={(e)=>handlePayment(e)}>
                    Thanh Toán 
                </a>
              </div>
            </div>
          </div>
        </div>
      
      </div>
          
      </div>
  )
}

Carts.propTypes = {}

export default Carts