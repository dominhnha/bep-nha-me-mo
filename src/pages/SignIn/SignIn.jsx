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
import CustomInput from '../../components/FieldCustom/CustomInput/CustomInput';
import { toast } from 'react-toastify';
const SignIn = (props) => {
  const history = useNavigate();
  const { Authur, dispatch } = useContext(AuthContext);
  const formik = useFormik({
    enableReinitialize: true,
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
    onSubmit: async (values) => {
      //code chức năng đăng nhập ở đây
      try {
        const { emailOrPhoneNumber, password } = values;
        const uid = await SiginUserAuthencation({
          email: emailOrPhoneNumber,
          password: password,
        });
        console.log(uid.payload)
        if (uid.success) {
          const initUser = await GetUserCollection(uid.payload.uid);
          if (initUser.success) {
            dispatch({
              type: AUTH__SET,
              payload: {
                user: {
                  uid: uid.payload.uid,
                  user: initUser.payload,
                }
              }
            })
            history("/")
          } else {
            toast.error('🦄 tài khoản hoặc mật khẩu sai vui lòng nhập lại', {
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

        } else {
          toast.error('🦄 tài khoản hoặc mật khẩu sai vui lòng nhập lại', {
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
      } catch (e) {
        toast.error('🦄 tài khoản hoặc mật khẩu sai vui lòng nhập lại', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          formik.values.emailOrPhoneNumber = ""
          formik.values.password = ""
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
        <CustomInput
          id={"emailOrPhoneNumber"}
          name={"emailOrPhoneNumber"}
          type={"text"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.emailOrPhoneNumber}
          errormessage={formik.errors.emailOrPhoneNumber}
          touchedForm={formik.touched.emailOrPhoneNumber}
          lable={"Email / Số điện thoại"}
        /
        >
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
        /
        >
        
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