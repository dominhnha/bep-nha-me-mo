import React from 'react'
import PropTypes from 'prop-types'
import './User.scss'
import { Outlet, useNavigate } from 'react-router'
import Section from '../../components/Section/Section'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContextProvider'
import { AUTH__REMOVE } from '../../reducers/type'
import { SignOut } from '../../services/Authencation/Authencation'
const User = props => {
    const { Authur,dispatch } = useContext(AuthContext);
    const history = useNavigate();
    const handleSiginOut = async()=>{
        await SignOut()
        dispatch({
            type:AUTH__REMOVE,
            payload:null,
        })
        history("/")
    }
  return (
    <div className='User'>
        <div className="container User__container">
            <div className="User__siderBar">
                <ul className="User__navication">
                    <div className="User__title">
                        <h2>Minh Nhật</h2>
                         {/* <p>Minhnhat@11</p> */}
                    </div>
                    <li className={`User__item`}>
                        <Link to={"/User"} >
                            <i class='bx bxs-edit-location'></i>
                            <span>Địa chỉ</span>
                        </Link>
                    </li>
                    <li className={`User__item`}>
                        <Link to={"/User/History"} >
                        <i class='bx bx-history' ></i>
                            <span>Lịch sử</span>
                        </Link>
                    </li>
                    <li className={`User__item`} onClick={()=>handleSiginOut()}>
                        <Link to={"/"} >
                            <i class='bx bx-log-out' ></i>
                            <span>Đăng xuất</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="User__view">
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

User.propTypes = {}

export default User