import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from "yup"
import { Link, useNavigate } from 'react-router-dom';

import './SignIn.scss';
import { SiginUserAuthencation } from '../../services/Authencation/Authencation';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { GetUserCollection } from '../../services/Authencation/User';
import { AUTH__SET } from '../../reducers/type';
const SignIn = (props) => {
  const history = useNavigate();
  const {Authur,dispatch} = useContext(AuthContext);
  const formik = useFormik({
    initialValues: {
      emailOrPhoneNumber: "",
      password: "",
    },
    validationSchema: Yup.object({
      emailOrPhoneNumber: Yup.string()
        .max(254, "Email hoặc số điện thoại bạn nhập phải ít hơn 254 kí tự")
        .required("Email / Số điện thoại không được bỏ trống"),
      password: Yup.string().required("Mật khẩu không được bỏ trống")
    }),
    onSubmit: async(values) => {
      //code chức năng đăng nhập ở đây
      try{
        const {emailOrPhoneNumber,password} = values;
        const uid = await SiginUserAuthencation({
          email:emailOrPhoneNumber,
          password:password,
        });
        console.log(uid.payload)
        if(uid.success){
          const initUser = await GetUserCollection(uid.payload.uid);
          if(initUser.success){
            dispatch({
              type:AUTH__SET,
              payload:{
              user:{
                  uid:uid.payload.uid,
                  user:initUser.payload,        
              }
            }         
            })
            history("/")
          }else{
            history("/404")
          }
          
        }else{
          history("/404")
        }
      }catch(e){
        history("/404")
      }
      console.log(Authur)
      
    }
  });
  return (
    <div className="center">
      <form className="sign-in-form" onSubmit={formik.handleSubmit}>
        <h1>Đăng Nhập</h1>
        <div class="tabs">
          <div class="tab-item active">Đăng nhập</div>
          <Link to={"/Account/SignUp"} className="tab-item">
            Đăng ký
          </Link>
        </div>
        <div className="input-container">
          <input 
            id = "emailOrPhoneNumber"
            name = "emailOrPhoneNumber"
            type="text"
            // placeholder = "Email / Số điện thoại"
            onChange = {formik.handleChange}
            onBlur = {formik.handleBlur}
            value={formik.values.emailOrPhoneNumber}
            required
          />
          <label className='border-null'>Email / Số điện thoại</label>
          {formik.touched.emailOrPhoneNumber && formik.errors.emailOrPhoneNumber ?  <p className="error-message active">{formik.errors.emailOrPhoneNumber}</p> : null}
        </div>
        <div className="input-container">
          <input 
            id = "password"
            name = "password"
            type="password"
            // placeholder = "Mật khẩu"
            onChange = {formik.handleChange}
            onBlur = {formik.handleBlur}
            value={formik.values.password}
            required
          />
          {formik.touched.password && formik.errors.password ?  <p className="error-message  active">{formik.errors.password}</p> : null}
          <label className='border-null'>Mật Khẩu</label>
        </div>
        <button type="submit">Đăng Nhập</button>
        <div className="forget-password">
          <a href="#">Bạn quên mật khẩu?</a>
        </div>
      </form>
    </div>
  );
};

SignIn.propTypes = {};

export default SignIn;