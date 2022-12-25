import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import "./SideBar.scss"
import Logo from "../../assets/Img/NEPNHAMEMO__LOGO.png"
import useAvatar from "../../assets/Img/PhongAvatar.jpg"
import { useState } from 'react'
import Avatar from '../Avatar/Avatar'
import { SectionTitle } from '../Section/Section'
const SideBar = props => {
    const [active,setActive] = useState(false)
    const listNavigation = [
        {
            icon:"bx bx-bar-chart-alt-2",
            path:"/",
            title:"Chart" 
        },
        {
            icon:"bx bx-package",
            path:"Product",
            title:"Product" 
        },
        {
            icon:"bx bx-user",
            path:"User",
            title:"User" 
          
        },
    ]
  return (
    <div className={`SideBar  ${active?"active":""}`}>
        <div className="SideBar__logo ">
            <Link to={"/"}>
                <img src={Logo} alt="" />
                <h2 className={`${active?"active":""}`}>Bếp Nhà Mẹ Mở</h2>
            </Link>
            
        </div>
        <div className={`SideBar__info ${active?"active":""}`}>

                <div className="SideBar__info__img">
                    <Avatar
                        path="/"
                        img={useAvatar}
                    />
                </div>
                <div className="SideBar__info__content">
                    <h2 className={`${active?"active":""}`}>Phong Trần</h2>
                    
                    <div className={`SideBar__info__status ${active?"active":""}`}>
                        <span ></span>
                        <p>admin</p>
                    </div>
                </div>
        
        </div>
        <ul className={`SideBar__info__list  ${active?"active":""}`}>
            <h2 className={`SideBar__info__title ${active?"active":""}`}>
                chức năng
            </h2>
            {
                listNavigation && listNavigation.map(item=>{
                    
                    return(
                            <li className={`SideBar__info__item  ${active?"active":""}`}>
                                <Link to={item.path}>
                                    <i className={item.icon}></i>
                                    <span className={`${active?"active":""}`}>{item.title}</span>
                                </Link>
                                
                            </li>
                    )
                })
            }              
        </ul>
           
        <div className="SideBar__bottom">
            {
                active == true
                ?<i class='bx bx-chevron-right' onClick={()=>setActive(false)}></i>
                : <i class='bx bx-chevron-left' onClick={()=>setActive(true)}></i>
            }
        </div>
        

    </div>
  )
}

SideBar.propTypes = {}

export default SideBar