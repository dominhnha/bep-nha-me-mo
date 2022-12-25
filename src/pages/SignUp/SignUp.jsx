import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik';
import * as Yup from "yup"

import './SignUp.scss'
import { Link,useNavigate } from 'react-router-dom';

import { AddUserAuthencation } from '../../services/Authencation/Authencation';
import { AddUserCollection } from '../../services/Authencation/User';
const SignUp = props => {
  const history = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      emailOrPhoneNumber: "",
      password: "",
      reEnterPassword: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        .max(30, "Họ đệm bạn nhập không vượt quá 30 ký tự")
        .required("Họ đệm không được bỏ trống"),
      lastname: Yup.string()
        .max(30, "Tên bạn nhập không vượt quá 30 ký tự")
        .required("Tên không được bỏ trống"),
      emailOrPhoneNumber: Yup.string()
        .max(254, "Email hoặc số điện thoại bạn nhập phải ít hơn 254 kí tự")
        .required("Email / Số điện thoại không được bỏ trống"),
      password: Yup.string().required("Mật khẩu không được bỏ trống"),
      reEnterPassword: Yup.string().required("Mật khẩu không được bỏ trống")
    }),
    onSubmit: async(values) => {
      try{
        const {emailOrPhoneNumber,firstname,lastname,password} = values;
        const uid =  await AddUserAuthencation({
          email:emailOrPhoneNumber,
          password:password,
        })
        console.log(uid)
        if(uid.success){
          console.log(uid.payload)
          const initUser = await AddUserCollection(uid.payload,{
            Email:emailOrPhoneNumber,
            firstname:firstname,
            lastname:lastname,
          })
          if(initUser.success){
            history("/Account/SignIn")
          }else{
            history("/404")
          }
        }
      }catch{
        history("/404")
      }
      
      
    }
  });
  return (
    
    <div className="center">
      <form className="sign-in-form" onSubmit={formik.handleSubmit}>
        <h1>Đăng Ký</h1>
        <div class="tabs">
          <Link to={"/Account/SignIn"} className="tab-item">
            Đăng nhập
          </Link>
          <div class="tab-item active">Đăng ký</div>
        </div>
        <div className="input-container">
            <input 
              id = "firstname"
              name = "firstname"
              type="text"
              onChange = {formik.handleChange}
              onBlur = {formik.handleBlur}
              value={formik.values.firstname}
              required
            />
            <label className='border-null'>Họ Đệm</label>
           {formik.touched.firstname && formik.errors.firstname ?  <p className="error-message active">{formik.errors.firstname}</p> : null}   
        </div>
        <div className="input-container">
          <input 
              id = "lastname"
              name = "lastname"
              type="text"
              onChange = {formik.handleChange}
              onBlur = {formik.handleBlur}
              value={formik.values.lastname}
              required
            />
            <label className='border-null'>Tên</label>
           {formik.touched.lastname && formik.errors.lastname ?  <p className="error-message active">{formik.errors.lastname}</p> : null}
        </div>
        
        <div className="input-container">
          <input 
            id = "emailOrPhoneNumber"
            name = "emailOrPhoneNumber"
            type="text"
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
            onChange = {formik.handleChange}
            onBlur = {formik.handleBlur}
            value={formik.values.password}
            required
          />
          <label className='border-null'>Mật Khẩu</label>
          {formik.touched.password && formik.errors.password ?  <p className="error-message active">{formik.errors.password}</p> : null}
        </div>
        <div className="input-container">
          <input 
            id = "reEnterPassword"
            name = "reEnterPassword"
            type="password"
            onChange = {formik.handleChange}
            onBlur = {formik.handleBlur}
            value={formik.values.reEnterPassword}
            required
          />
          <label className='border-null'>Nhập lại mật khẩu</label>
          {formik.touched.reEnterPassword && formik.errors.reEnterPassword ?  <p className="error-message active">{formik.errors.reEnterPassword}</p> : null}
        </div>
        <button type="submit">Đăng Ký</button>
        <div className="forget-password">
          <a href="#">Bạn quên mật khẩu?</a>
        </div>
      </form>
    </div>
  );
};

SignUp.propTypes = {};

export default SignUp;