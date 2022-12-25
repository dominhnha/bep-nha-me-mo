import React from 'react'
import PropTypes from 'prop-types'
import "./Contact.scss"
import BannerImg from '../../assets/Img/bg-home-2.jpg'
import pattern from '../../assets/Img/pattern.png'
import object1 from '../../assets/Img/object1.png'

import MinhNhat from '../../assets/Img/AvatarNhat.png'
import AnhQuyet from '../../assets/Img/QuyetAvatar.jpg'
import PhongTran from '../../assets/Img/PhongAvatar.jpg'
import MinhTu from '../../assets/Img/TuAvatar.png'
import CongMinh from '../../assets/Img/MinhAvatrt.jpg'
import ProductOwn from '../../assets/Img/ProductOwn.png'
import Button from '../../components/Button/Button/Button'
import { Link } from 'react-router-dom'


// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Pagination } from 'swiper'
import { useState } from 'react'
import { useEffect } from 'react'
import Avatar from '../../components/Avatar/Avatar'
const Devolopment = [
    {
        Name:"Đỗ Minh Nhật",
        Img:MinhNhat,
        Department:"Front End",
        Github:"https://github.com/dominhnha",
        Facebook:"",
        Education:"",
    },
    {
        Name:"Phạm Anh Quyết",
        Img:AnhQuyet,
        Department:"Back End",
        Github:"https://github.com/phamanhquyet",
        Facebook:"https://www.facebook.com/phamanhquyet277",
        Education:"",
    },
    {
        Name:"Minh Tú",
        Img:MinhTu,
        Department:"Back End",
        Github:"https://github.com/dominhnha",
        Facebook:"",
        Education:"",
    },
    {
        Name:"Trần Lê Phong",
        Img:PhongTran,
        Department:"Tester",
        Github:"https://github.com/dominhnha",
        Facebook:"",
        Education:"",
    },
    {
        Name:"Công Minh",
        Img:CongMinh,
        Department:"Data Analysis",
        Github:"https://github.com/dominhnha",
        Facebook:"",
        Education:"",
    },
    
]
const Feedback = [
    {
        Name:"Đỗ Minh Nhật",
        Img:MinhNhat,
        Comment:"Lorem, ipsum dolor sit, amet consectetur adipisicing elit. Autem neque, accusantium, ex exercitationem vero distinctio et quaerat non, quod placeat, obcaecati consectetur"
    },
    {
        Name:"Trần Anh Quyết",
        Img:AnhQuyet,
        Comment:"Lorem, ipsum dolor sit, amet consectetur adipisicing elit. Autem neque, accusantium, ex exercitationem vero distinctio et quaerat non, quod placeat, obcaecati consectetur"
    },
    {
        Name:"Đỗ Lê Phong",
        Img:PhongTran,
        Comment:"Lorem, ipsum dolor sit, amet consectetur adipisicing elit. Autem neque, accusantium, ex exercitationem vero distinctio et quaerat non, quod placeat, obcaecati consectetur"
    },
]
const Contact = props => {
    const [swiperRef, setSwiperRef] = useState(null);
    useEffect(()=>{
          window.scrollTo(0, 0)
    },[])
  return (
    <div className='About'>
        <div className="container About__container ">
            <div className="About__banner">
                    <img src={BannerImg} alt="" />
                    <div className="About__content">
                        <h2>Bếp Nhà Mẹ Mở</h2>
                    </div>
            </div>
            <div className="About__about">
                <div className="About__about__left">
                    <div className="About__about__warpper">
                    <img src={ProductOwn} alt=""  className='About__about__img'/>
                        <img src={pattern} alt=""  className='About__about__bg'/>
                    </div>
                    
                </div>
                <div className="About__about__right">
                    <p>Về Chúng Tôi</p>
                    <h2>Bếp Nhà Mẹ Mở</h2>
                    <span>Lorem ipsum, dolor, sit amet consectetur adipisicing elit. Dicta excepturi nostrum facere illum dignissimos, amet quibusdam. Suscipit ratione in consequuntur.</span>
                    <Link to="/">
                        <Button> Mua Sắm Ngay</Button>
                    </Link>
                </div>
            </div>
            <div className="About__development">
                <h2 className="About__development__title">
                    Đội ngũ phát triển
                </h2>
                <Swiper
                    onSwiper={setSwiperRef}
                    centeredSlides={true}
                    // slidesPerView={4}
                    spaceBetween={40}
                    pagination={{
                    type: "fraction",
                    }}
                    //navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                    autoplay={{
                        "delay": 3500,
                        "disableOnInteraction": false
                        }} 
                        loop={true} 
                    breakpoints = {{
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 20
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20
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
                        Devolopment && Devolopment.map(item=>{
                            return (
                                <SwiperSlide>
                                    <div class="card">
                                        <div class="card__img">
                                            <img src={item.Img} alt="Nam" />
                                        </div>
                                        <h2>{item.Name}</h2>
                                        <p>{item.Department}</p>
                                        <div class="card__social">
                                            <a href={item.Facebook} target="_blank">

                                                <i class='bx bxl-facebook-circle'></i>
                                            </a>
                                            <a href={item.Education} target="_blank">
                                                <i class='bx bxs-graduation' ></i>
                                            </a>
                                            <a href={item.Github} target="_blank">
                                                <i class='bx bxl-github' ></i>
                                            </a>
                                        </div>
                                    </div>
                                </SwiperSlide>
                               
                            )
                        })
                    }
                   
                </Swiper>


            
            </div>
            <div className="About__Feedback">
                <div className="About__Feedback__warpper">
                    <div className="About__Feedback__left">
                        <h2>Phản Hồi Từ Khách Hàng</h2>
                    </div>
                    <div className="About__Feedback__right">
                        <Swiper
                            onSwiper={setSwiperRef}
                            slidesPerView={1}
                            centeredSlides={false}
                            spaceBetween={4}
                            pagination={{
                            type: "fraction",
                            }}
                            //navigation={true}
                            modules={[Pagination, Navigation]}
                            className="mySwiper"
                            autoplay={{
                                "delay": 1500,
                                "disableOnInteraction": false
                                }} 
                                loop={true} 
                            breakpoints = {{
                                1024: {
                                    slidesPerView: 1,
                                    spaceBetweenSlides: 150
                                },
                                768: {
                                    slidesPerView: 1,
                                    spaceBetweenSlides: 200
                                },
                                480: {
                                    slidesPerView: 1,
                                    spaceBetweenSlides: 250
                                },
                                0:{
                                    slidesPerView: 1,
                                    spaceBetweenSlides: 250
                                }
                            }}
                        >
                            {
                                Feedback && Feedback.map(item=>{
                                    return (
                                        <SwiperSlide>
                                            <div className="About__Feedback__item">
                                            
                                                <div className="About__Feedback__item__warpper">
                                                    <Avatar 
                                                        path={"/"}
                                                        img={item.Img}
                                                    ></Avatar>
                                                    <span>{item.Name}</span>
                                                </div>
                                                <p className="About__Feedback__item__comment">
                                                    {item.Comment}
                                                </p>
                                            </div>
                                        </SwiperSlide>
                                        
                                    )
                                })
                            }
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
        <img src={pattern} alt="" className='bg--top'/>
        <img src={object1} alt="" className='bg--bottom'/>
    </div>
  )
}

Contact.propTypes = {}

export default Contact