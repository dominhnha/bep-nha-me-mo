import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik';
import * as Yup from "yup"

import './SignUp.scss'
import { Link,useNavigate } from 'react-router-dom';

import { AddUserAuthencation } from '../../services/Authencation/Authencation';
import { AddUserCollection } from '../../services/Authencation/User';
import CustomInput from '../../components/FieldCustom/CustomInput/CustomInput';
import { toast } from 'react-toastify';
const SignUp = props => {
  const history = useNavigate();
  const formik = useFormik({
    enableReinitialize: true,
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
            toast.error('🦄 không tạo được tài khoản vui lòng thử lại', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
          }
        }
      }catch{
        toast.error('🦄 không tạo được tài khoản vui lòng thử lại', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
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
        <CustomInput
          id={"firstname"}
          name={"firstname"}
          type={"text"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstname}
          errormessage={formik.errors.firstname}
          touchedForm={formik.touched.firstname}
          lable={"Họ"}
        />
        <CustomInput
          id={"lastname"}
          name={"lastname"}
          type={"text"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastname}
          errormessage={formik.errors.lastname}
          touchedForm={formik.touched.lastname}
          lable={"Tên"}
        />
        <CustomInput
          id={"emailOrPhoneNumber"}
          name={"emailOrPhoneNumber"}
          type={"text"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.emailOrPhoneNumber}
          errormessage={formik.errors.emailOrPhoneNumber}
          touchedForm={formik.touched.emailOrPhoneNumber}
          lable={"Email"}
        />
        <CustomInput
          id={"password"}
          name={"password"}
          type={"password"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          errormessage={formik.errors.password}
          touchedForm={formik.touched.password}
          lable={"Mật khẩu"}
        />
        <CustomInput
          id={"reEnterPassword"}
          name={"reEnterPassword"}
          type={"password"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.reEnterPassword}
          errormessage={formik.errors.reEnterPassword}
          touchedForm={formik.touched.reEnterPassword}
          lable={"Nhập lại mật khẩu"}
        />
        
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