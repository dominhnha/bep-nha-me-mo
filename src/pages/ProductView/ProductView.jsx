import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './ProductView.scss'
import { v4 } from 'uuid';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";



// import required modules
import { FreeMode, Navigation, Thumbs, Mousewheel, Pagination } from "swiper";
import ButtonQuantity from '../../components/Button/ButtonQuantity/ButtonQuantity';
import Button from '../../components/Button/Button/Button';
import { useNavigate, useParams } from 'react-router';
import { toast } from "react-toastify";
import { classifyProduct, GetProductById } from '../../services/Product/Product';
import EffectLoanding from '../../components/LoadingSkeleton/EffectLoanding/EffectLoanding';
import { AddToCart, GetToCart, GetUserCollection, setNewCart } from '../../services/Authencation/User';
import Section, { SectionBody, SectionTitle } from '../../components/Section/Section';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { AUTH__SET, CART__REMOVE, CART__UPDATA, PAYMENT__UPDATA } from '../../reducers/type';
import Cart from '../Cart/Carts';
import { CartContext } from '../../contexts/CartContextProvider';
import { PaymentContext } from '../../contexts/PaymentContextProvider';
import ProductCand from '../../components/ProductCand/ProductCand';
import ComponentLoading from '../../components/LoadingSkeleton/ComponentLoading/ComponentLoading';
import {formatNumber} from '../../utils/Format'


const ProductView = props => {
  const history = useNavigate();
  const {Cart,Cartdispatch} = useContext(CartContext);
  const { Payment,Paymentdispatch} = useContext(PaymentContext);
  const [imagesNavSlider, setImagesNavSlider] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [product,setProduct] = useState(null);
  const [Classify,setClassify] = useState([]);

   // get Slug by Url
   const {slug} = useParams();
   useEffect(()=>{
    window.scrollTo(0,0);
   },[product])
  //EffectLoanding

  //call Product API 
  useEffect(()=>{
    const getProduct = async(slug)=>{
      try{
        const initProduct =  await GetProductById(slug);
        if(initProduct.success){
          setProduct(initProduct.payload);
        }
      }catch(e){
        console.log(e)
      }
    }
    getProduct(slug);
  },[slug])

  // get Classify 
  useEffect(()=>{
    const getclassify = async()=>{
      if(product!=null){
        const data = await classifyProduct(product.Info.Classify);
        setClassify(data.payload);
      }
    }
    getclassify();
  },[product])
  //---------------- add to Cart user-------------------- 
  const handleAddToCart = useCallback( async(curCart) =>{
    toast.success(`Thêm thành công 
     ${slug}
     `, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    try{
      
      Cartdispatch({
        type:CART__UPDATA,
        payload:{
            Pid:slug,
            Quantity:quantity,
            Price:product.Info.Discount ? (product.Info.Price *(1-product.Info.Discount)):product.Info.Price ,
            Image:product.Info.Image,
            NameProduct:product.Info.NameProduct,
        }         
      })
        
     
    }catch(e){
      console.log(e)
    }
  },[Cart,product,quantity])
  //--------------- user payment product----------------- 
  const handlePayment = useCallback((e)=>{
    try{
      Paymentdispatch({
        type:PAYMENT__UPDATA,
        payload:{
            Pid:slug,
            Quantity:quantity,
            Price:product.Info.Discount ? (product.Info.Price *(1-product.Info.Discount)):product.Info.Price ,
            Image:product.Info.Image,
            NameProduct:product.Info.NameProduct,
        }    
      })
      history("/Product/Payment");
    }catch(e){
      console.log(e)
    }
  },[Cart,product,quantity])

  console.log(slug)
  console.log("Product",product)
  console.log("C",Classify)
  console.log(Cart)
  console.log("his",history.name)

  
  return (
    <div className="ProductView">
      <div className="container">
          <div className="ProductView__Product">
                <div className="ProductView__left">
                <div className="slider">
                  <div className="slider__flex">
                    <div className="slider__col">
                      <div className="slider__prev">
                        <i class='bx bx-chevron-left'></i>
                      </div>
                      {
                        product!= null 
                        ? <div className="slider__thumbs">    
                            <Swiper
                              onSwiper={setImagesNavSlider}
                              direction="vertical"
                              spaceBetween={10}
                              
                              slidesPerView={3}
                              centeredSlides={false} 
                              loop={true} 
                              navigation={{
                                nextEl: ".slider__next",
                                prevEl: ".slider__prev"
                              }}
                              className="slider__warpper"
                              modules={[Navigation, Thumbs]}
                            >
                              {product && product.Info.Image.map((item) => {
                                return (
                                  <SwiperSlide key={v4()}>
                                    <div className="slider__image">
                                      <img src={item} alt="" />
                                    </div>
                                  </SwiperSlide>
                                );
                              })}
                            </Swiper>
                        </div>
                        : 
                        <EffectLoanding
                            height={304}
                        />

                      }                      
                      <div className="slider__next">
                        <i class='bx bx-chevron-right'></i>
                      </div>
                    </div>
                    {
                       product != null 
                       ? <div className="slider__images">
                       <Swiper
                         thumbs={{ swiper: imagesNavSlider }}
                         direction="vertical"
                         slidesPerView={1}
                         spaceBetween={10}
                         mousewheel={true}
                         loop={true} 
                         navigation={{
                           nextEl: ".slider__next",
                           prevEl: ".slider__prev"
                         }}
                         
                         className="slider__warpper"
                         modules={[Navigation, Thumbs, Mousewheel]}
                         onSlideChange={() => console.log('slide change')}
                       >
                         {product!=null && product.Info.Image.map((item) => {
                           return (
                             <SwiperSlide key={v4()}>
                               <div className="slider__image slider__image__cur">
                                 <img src={item} alt="" />
                               </div>
                             </SwiperSlide>
                           );
                         })
                         
                       }
                       </Swiper>
                     </div>
                     : 
                     <EffectLoanding
                        height={400}
                     />
                    }
                    
                  </div>
                </div>
                </div>
                <div className="ProductView__right">
                    <SectionTitle>
                      {
                        product != null
                        ? <span>{product.Info.NameProduct}</span>
                        : <EffectLoanding/>
                      }
                    </SectionTitle>
                   
                    <div className="ProductView__price">
                    <span className="ProductView__desc">giá</span>
                      {
                          product != null
                          ? 
                          <>
                            <p className="ProductView__discount">{formatNumber(product.Info.PriceDiscount ? product.Info.PriceDiscount : product.Info.Price )}₫</p>
                            <p className="ProductView__cur">{`${ product.Info.PriceDiscount ? formatNumber(product.Info.Price):""}`} {product.Info.PriceDiscount ?"₫":"" }</p>
                          </>
                          : <EffectLoanding/>
                        }
                      
                    </div>
                    <div className="ProductView__element">
                      <span className="ProductView__desc">Thành phần chính:</span>
                      {
                          product != null
                          ? 
                          <>
                            {product.Info.Ingerdient}
                          </>
                          : <EffectLoanding height={100}/>
                        }
                      
                    </div>
                    <div className="ProductView__quantity">
                      <span className="ProductView__desc">Số lượng</span>
                      <ButtonQuantity
                        quantity={quantity}
                        setQuantity={setQuantity}
                      />
                    </div>
                    <div className="ProductView__control">
                        <Button
                          onClick={handleAddToCart}
                        >
                          Thêm Giỏ Hàng
                        </Button>
                        <Button
                          onClick={handlePayment}
                        >
                          Mua Ngay
                        </Button>
                    </div>
                </div>
          </div>
          <div className="ProductView__infomation">
              <SectionTitle>
                  Thông tin chi tiết sản phẩm
              </SectionTitle>
              {
                product != null
                ? <ul className="ProductView__expiryday">
                    <span className="ProductView__expiryday__title"> Hạng sử dụng</span>
                    <li>
                      <span className="ProductView__desc"> từ ngày</span> {product.Info.exp.toDate().toDateString()}
                    </li>
                    <li>
                      <span className="ProductView__desc"> Đến ngày</span> {product.Info.mfg.toDate().toDateString()}
                    </li>
                  </ul>
                : <EffectLoanding/>
              }
              
              <div className="ProductView__infomation__desc">
                      <span className="ProductView__desc">Mô Tả sản Phẩm :</span>
                      {
                          product != null
                          ? 
                          <>
                            {product.Info.DescriptionProduct}
                          </>
                          : <EffectLoanding height={100}/>
                        }
            
              </div>
                 
          </div>
          <div className="ProductView__more">
            <Section>
                <SectionTitle>
                    Sản phẩm liên quan
                </SectionTitle>
                <SectionBody>
                    <Swiper
                      // centeredSlides={true}
                      // pagination={{
                      //   type: "fraction",
                      // }}
                          //navigation={true}
                      modules={[Pagination, Navigation]}
                      className="mySwiper"
                      autoplay={{
                        "delay": 1500,
                        "disableOnInteraction": true
                      }} 
                      loop={true} 
                       spaceBetween={10}
                      // grid={4}
                      breakpoints = {{
                              1024: {
                                  slidesPerView: 4,
                                  spaceBetweenSlides: 40
                              },
                              768: {
                                  slidesPerView: 2,
                                  spaceBetweenSlides: 20
                              },
                              480: {
                                  slidesPerView: 1,
                                  spaceBetweenSlides: 20
                              },
                              0:{
                                  slidesPerView: 1,
                                  spaceBetweenSlides: 20
                              }
                          }}
                      >
                        {
                          Classify.length > 0 
                          ? Classify.map(item=>{
                            console.log("item",item)
                              return(
                                <SwiperSlide>
                                  <ProductCand
                                    key={item.Pid}
                                    Pid={item.Pid}
                                    Name={item.Info.NameProduct}
                                    Description={item.Info.DescriptionProduct}
                                    Image={item.Info.Image}
                                    Price={item.Info.Price}
                                    sale={30}
                                  />
                                </SwiperSlide>
                              )
                            })
                          :Array(8)
                          .fill(0)
                          .map(item=>{
                            return(
                              <SwiperSlide>
                                <ComponentLoading key={v4()}/>
                              </SwiperSlide>
                            )
                          })
                        }
                    </Swiper>
                </SectionBody>
            </Section>
          </div>
      </div>
        
    </div>
  )
}

ProductView.propTypes = {}

export default ProductView