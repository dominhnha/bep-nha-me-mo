import React from 'react'
import PropTypes from 'prop-types'
import "./Slider.scss"
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
// import "swiper/components/pagination/pagination.min.css"
// import "swiper/components/navigation/navigation.min.css"

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// import Swiper core and required modules
import SwiperCore, {
    Autoplay,Pagination,Navigation
} from 'swiper/core';

import { v4 } from 'uuid';
import { Link } from 'react-router-dom';
import Img  from '../../assets/Img/Slider.jpg'
import Button from '../Button/Button/Button';
import slider_01 from '../../assets/Img/Slider.jpg'
import slider_02 from '../../assets/Img/tet.jpg'
  // install Swiper modules
SwiperCore.use([Autoplay,Pagination,Navigation]);

const ListSlider = [
    {
        Image:slider_02,
        Title:"Tết Việt",
        desc:`Bếp Nhà Mẹ Mỡ - Mang hương vị Tết đong đầy
        `,
        url:"/event"
    },
    {
        Image:slider_01,
        Title:"Vui Nhà Làm",
        desc:"Bánh truyền thống mang nét đẹp riêng nhà Mỡ cùng nhau tận hưởng phút giây tuyệt vời ...   ",
        url:"/Product/Search"  
    },
    
    
]
const Slider = props => {
  return (
    <Swiper spaceBetween={30} 
        centeredSlides={true} 
        autoplay={{
        "delay": 4500,
        "disableOnInteraction": false
        }} 
        pagination={{
        "clickable": true
        }} 
        loop={"true"}
        navigation={true} 
        className="mySwiper"
        breakpoints = {{
            1024: {
                
            },
            768: {
                navigation:false,
            },
            480: {
                navigation:false,
            },
            0:{
                navigation:false,
            }
        }}
    >
        {
            ListSlider && ListSlider.map(item=>{
                return(
                    <SwiperSlide
                        key={v4()}
                    >
                        {
                            ({ isActive }) => (
                                <div className={`Slider__item ${isActive ? 'active' : ''}`}>
                                    <img src={item.Image} alt="anh" />
                                    <div className="Slider__item__wrapper Slider__item__container">
                                        <h2>{item.Title}</h2>
                                        <p>{item.desc}</p>
                                        <Link to={item.url}>
                                            <Button>Xem thêm</Button>
                                        </Link>
                                    </div>
                                </div>
                                
                            )
                        }
                        
                    </SwiperSlide>
                )
            })
        }
        
    </Swiper>
  )
}

Slider.propTypes = {}

export default Slider