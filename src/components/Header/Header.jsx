import React, { useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Logo from '../../assets/Img/NEPNHAMEMO__LOGO.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Icon from '../Icon/Icon'
import  './Header.scss'


import { getDatabase } from 'firebase/database'
import { AuthContext } from '../../contexts/AuthContextProvider'
import { CartContext } from '../../contexts/CartContextProvider'
import Avatar from '../Avatar/Avatar'
import { object } from 'yup/lib/locale'

const Header = props => {

  const {pathname} = useLocation();
  const history = useNavigate();
  
  
  const navBar = [
    {
      title: 'Trang chủ',
      path: '/', 
    },
    {
      title: 'Sản phẩm',
      path: '/Product/Search',
    }
    ,{
      title:'Sự Kiện',
      path: '/Event',
    }
    ,{
      title:'Giới Thiệu',
      path: '/Contact',
    }
    
  ]

  const DomHeader  = useRef(null);
  // active navber menu 
  const activeNavbar = ()=>{
      DomHeader.current.classList.toggle('active');
  }
  // load auth
  const {Authur} = useContext(AuthContext);
  const {Cart} = useContext(CartContext);
  const [quantity,setQuantity] = useState(0);

//   Pid:"QN2QqV40L7rF0FsLqZc5",
  // useEffect(() => {
  //   const handleQuantity = ()=>{
  //     if(Authur.success == false){
  //       setQuantity(0);
  //     }else if (Authur.success == true && Authur.payload.user.Cart.length <= 0){
  //       setQuantity(0);
  //     }else{
  //       setQuantity(Authur.payload.user.Cart.length)
  //     }
  //   }
  //   if(Authur.success){
  //     console.log()
  //   }
  //   handleQuantity();
  // }, [Authur])
  // user 
  // useEffect(()=>{
  //   // input new obj
  //   if(Authur.success == true){
  //     const CartUser = Authur.payload.user
  //     const newUser = Authur.payload.user.Cart.map(item=>{
  //       if(item.Pid == "QN2QqV40L7rF0FsLqZc5"){
  //         const initQuantity = item.Number++;
  //         return{
  //           Pid:item.Pid,
  //           Number:initQuantity,
  //         }
  //       }
  //       else{
  //         return item
  //       }
  //     })
  //     console.log("P",newUser)
  //   }
  // },[Authur])

  // cart 
  useEffect(()=>{
    console.log("cart header",Cart);
    const handleQuantity = ()=>{
      try{
        if(Cart.success == false){
          setQuantity(0);
        }else if (Cart.success == true){
          console.log(Cart.payload.length)
          setQuantity(Cart.payload.length);
        }
      }catch(e){
        console.log(e)
        setQuantity(0);
      }
    }
    handleQuantity();
  },[Cart])
  console.log('load auth',Authur);


  
  
  // console.log('database',auth.currentUser.uid); 
  return (
    <header className='Header' ref={DomHeader}>    
        <div className="container">
            <div className="Header__list">
                <div className="Header__logo">
                  <Link to="/">
                    <img src={Logo} className="Header__logo__img" alt="logo" />
                    <h2>Bếp Nhà Mẹ MỠ</h2>
                  </Link>
                </div>
                <nav className="Header__nav">
                    {
                      navBar.map((item, index) => {
                        return (
                          <div className={`Header__nav__item ${pathname == item.path ? `active` :``}`} key={index}>
                              <Link onClick={()=>activeNavbar()} to={item.path}>{item.title}</Link>
                          </div>
                        )
                      })
                    }
                    <i onClick={()=>activeNavbar()} className='Header__nav__icon bx bx-chevron-left' ></i>
                </nav>
                <ul className="Header__user">
                    <li className="Header__user__item">
                        <Icon
                          icon={"bx bx-search"}
                          path={"Product/Search"}
                          describe={"Tìm kiếm"}
                        />
                    </li>
                    <li className="header__user__item">
                        <Icon
                          icon={"bx bx-cart-alt"}
                          path={"/Account/Cart"}
                          describe={"Giỏ hàng"}
                          quantity={quantity}
                        />
                    </li>
                    {
                      Authur.success !== false
                       ?<Avatar
                          img={ Authur.payload.user.ImgUser}
                          path={`${Authur.success == true ?"/User":"Account/SignIn"}`}
                       />
                       :
                       <li className="header__user__item">
                        <Icon
                          icon={"bx bx-user"} 
                          path={"/Account/SignIn"}
                          describe={"Đăng nhập"}
                        />
                      </li> 
                    }
                    
                    
                </ul>
              <i onClick={()=>activeNavbar()} className='Header__mobile bx bx-menu-alt-right'></i>
            </div>
        </div>
    </header>
  )
}

Header.propTypes = {}

export default Header