import React from 'react'
import PropTypes from 'prop-types'
import _404 from '../../assets/Img/404.svg'
import './Error.scss'
import { Link } from 'react-router-dom'

const Error = props => {
  return (
    <div className="error-page">
      <img className="error-page__image"src={_404} alt=""></img>
      <p className="error-page__message">
        Bé ơi lộn nhà rồi, chỗ này không có page của Mỡ giúp mình quay lại trang chủ mua bánh nhé moa moa :3
      </p>
      <Link to={"/"}>
        <button type="submit">Quay Lại Trang Chủ</button>
      </Link>
    </div>
  )
}

Error.propTypes = {}

export default Error