import React from 'react'
import PropTypes from 'prop-types'
import Grid from '../Grid/Grid'
import { Link } from 'react-router-dom'
import Page from '../../assets/Img/NEPNHAMEMO__LOGO.png'
import MoMo from '../../assets/Img/icon-MoMo.jpg'
import COD from '../../assets/Img/COD.jpg'
import "./Footer.scss"
import { v4 } from 'uuid'

function Footer(props) {
  const navLink = [
    {
      title: 'Tìm kiếm',
      path:"/search",
    },
    {
      title: 'Giới thiệu',
      path:"/review",
    }
    ,{
      title: 'Chính sách đổi trả',
      path:"/review",
    },
    {
      title: 'Chính sách bảo mật',
      path:"/review",
    }
  ]

  const contact = [
    {
      icon:"bx bxl-facebook-circle",
      title: 'Facebook',
      path:"https://www.facebook.com/",
    },
    {
      icon:"bx bxl-instagram",
      title: 'Intagram',
      path:"",
    },
    {
      icon:"bx bxl-github",
      title: 'Github',
      path:"",
    },
  ]
  
  
  return (
    <footer className='footer'>
      <div className="container">
        <Grid
          col={4}
          mdCol={2}
          smCol={1}
          gap={2}
        >
          <ul className="footer__cand">
              <h1 className="footer__title">Bếp Nhà Mẹ Mỡ</h1>
              <p className="footer__desc">MỠ! - Nâng tầm bánh Việt</p>
              <a href="" className='footer__contact'><i className='bx bxs-phone'></i> 1900 866632</a>
              <a href="" className='footer__contact'><i className='bx bxl-gmail' ></i> BepNhaMeMo@gmail.com</a>
          </ul>
          <ul className="footer__cand">
            <h1 className="footer__title">Liên kết</h1>
            {
              navLink.map((item,index)=>{
                return(
                  <Link  to={`${item.path}`} key={v4()} className="footer__link">
                    {item.title}
                  </Link>
                )
              })
            }
          </ul>
          <div className="footer__item">
            <h1 className="footer__title">Liên Hệ</h1>
            {
              contact.map((item,index)=>{
                return(
                  <a  href={`${item.path}`} target="_blank" rel="noopener" key={v4()} className="footer__link">
                      <i className={item.icon}></i>
                      <span>{item.title}</span>
                  </a>
                )
              })
            }
          </div>
          <div className="footer__item">
            <h1 className="footer__title">Đăng ký nhận khuyến mãi</h1>
            <p className="footer__desc">
              Hãy là người đầu tiên nhận khuyến mãi lớn!
            </p>
            <div className="footer__from">
                <input type="email" placeholder='Để lại gmail' className="footer__input" />
                <button>Gửi</button>
            </div>
            
          </div>
        </Grid>
        <div className="footer__copyright">
          <p>© Copyright 2022 By BepNhaMeMo. Group 1</p>
          <ul className="footer__paymet">
            <li>
              <span>Hình thức thanh toán</span>
            </li>
            <li>
              <img src={MoMo} alt="" />
            </li>
            <li>
              <img src={COD} alt="" />
            </li>
          </ul>
        </div>
      </div>

    </footer>
  )
}

Footer.propTypes = {}

export default Footer
