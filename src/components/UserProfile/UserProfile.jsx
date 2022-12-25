import React from 'react'
import PropTypes from 'prop-types'
import './UserProfile.scss'
import { Outlet, useNavigate } from 'react-router'
import { useFormik } from 'formik';
import * as Yup from "yup"
import { SectionBody, SectionTitle } from '../Section/Section';
import Button from '../Button/Button/Button';
import { useState } from 'react';
import { useCallback } from 'react';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { useContext } from 'react';
import { useEffect } from 'react';
import { UploadImagetoCloud } from '../../services/Cloud/Cloud';
import { formatTimestamptoDate } from '../../utils/Format';
import { GetUserCollection, UpdateUser } from '../../services/Authencation/User';
import { AUTH__REMOVE, AUTH__SET } from '../../reducers/type';
import { toast } from 'react-toastify';
import { SignOut } from '../../services/Authencation/Authencation';

const initUser = {
    uid: "",
    user: {
        Address: "",
        Birthdate: "",
        Email: "",
        FullName: "",
        ImgUser: "",
        Number: "",
        Role: "user"
    }
}
const UserProfile = props => {
    const [active, setActive] = useState(null);
    const [formUser, setFormUser] = useState(initUser);
    const [image,setImage] = useState("")
    const [status, setStatus] = useState(true);
    // load auth
    const { Authur,dispatch } = useContext(AuthContext);
   
    // set top 0 
  useEffect(()=>{
    window.scrollTo(0,0);
   },[])
   // get data by user
    useEffect(() => {
        const getUser = async () => {
            if (Authur.success == true) {
                const newUser = await GetUserCollection(Authur.payload.uid)
                if(newUser.success == true){
                    const initUser = {
                        uid: Authur.payload.uid,
                        user: newUser.payload
    
                    }
                    console.log("init user",initUser)

                    setFormUser(initUser)
                    setImage(initUser.user.ImgUser)
                }
              
            }
        }
        getUser()
    }, [Authur])
    // logout
   

    // view control status
    const handleStatus = useCallback(() => {
        setStatus(false)
    }, [active])
    
    const editProduct = useCallback(() => {
        setActive(null);

    }, [active, formUser]);
    // backup current user
    const handleBackupProduct = useCallback(
        async (product) => {
            console.log("Product", product)
            formik.setFieldValue("Email", product.user.Email)
            formik.setFieldValue("Address", product.user.Address)
            formik.setFieldValue("Number", product.user.Number)
            formik.setFieldValue("Fullname", `${product.user.FullName}`)
            formik.setFieldValue("Birthdate", formatTimestamptoDate(formUser.user.Birthdate))
            setImage(Authur.payload.user.ImgUser)
            setStatus(true)
        }, [formUser]
    )
    // upload img for cloud
    const handleUploadImage = useCallback(async (Avatar) => {
        const initImage = await UploadImagetoCloud(Avatar);
        setImage(initImage.payload)

    }, [])
    // init formik
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            Email: formUser.user.Email,
            Address: formUser.user.Address,
            Number: formUser.user.Number,
            ImgUser: "",
            Fullname: formUser.user.FullName,
            Birthdate:formUser.user.Birthdate != "" ? formatTimestamptoDate(formUser.user.Birthdate.toDate()) :"0-0-0",
        },
        validationSchema: Yup.object({

        }),
        onSubmit: async (values) => {
            try {
                console.log("S",values)
                console.log("s",Authur)
               
                // action in provider
                dispatch({
                    type:AUTH__SET,
                    payload:  {
                        user:{
                            uid:Authur.payload.uid,
                            user:{
                                Address: values.Address,
                                Birthdate: values.Birthdate,
                                Email: values.Email,
                                FullName: values.Fullname,
                                ImgUser: image,
                                Number: values.Number,
                                Role: "User"
                            }       
                        }
                    }      
                })
                console.log(Authur)
                await UpdateUser(Authur.payload.uid,{
                    Email:values.Email,
                    Address: values.Address,
                    Number: values.Number,
                    ImgUser:image,
                    FullName:values.Fullname,
                    Birthdate:values.Birthdate,
                    
                })
                toast.success(`🦄 cập nhập thành công`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
            } catch (err) {
                console.log(err);
            }
            setStatus(true)
        },
    })
    console.log("img",image)
    return (
        <div className="UserProfile__From">

            <SectionTitle>
                <div className='UserProfile__title'>

                    <span>

                    </span>
                    {
                        status
                            ? <div className="UserProfile__btn" onClick={() => handleStatus()}
                            >
                                <Button>Edit</Button>
                            </div>
                            :
                            <div className="UserProfile__warpper__btn">
                                <div className="UserProfile__btn" onClick={() => handleBackupProduct(formUser)}>
                                    <Button>Close</Button>
                                </div>
                                <div className="UserProfile__btn" onClick={formik.submitForm}>
                                    <Button>Save</Button>
                                </div>

                            </div>
                    }
                </div>
            </SectionTitle>
            <SectionBody>
                <div className="UserProfile__warpper">
                    <form action="" className='UserProfile__infomation'>
                        <fieldset>
                            <legend>Thông tin khách hàng</legend>
                            <div className="input-container border--active input-container__center ">
                                <label className='active'>Họ và tên</label>
                                <input
                                    id="Fullname"
                                    name="Fullname"
                                    type="text"
                                    placeholder="Vui lòng nhập họ và tên..."
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.Fullname}
                                    required="false"
                                    disabled={status ? "active" : ""}
                                />

                                {formik.touched.Fullname && formik.errors.Fullname
                                    ? <p className="error-message">{formik.errors.Fullname}</p> : null}

                            </div>
                            <div className="input-container border--active input-container__center ">
                                <label className='active'>Email</label>
                                <input
                                    id="Email"
                                    name="Email"
                                    type="text"
                                    placeholder="Email...."
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.Email}
                                    required="false"
                                    disabled={status ? "active" : ""}
                                />

                                {formik.touched.Email && formik.errors.Email
                                    ? <p className="error-message">{formik.errors.Email}</p> : null}

                            </div>
                            <div className="input-container border--active input-container__center ">
                                <label className='active'>Số điện thoại</label>
                                <input
                                    id="Number"
                                    name="Number"
                                    type="text"
                                    placeholder="Vui lòng nhập số điện thoại..."
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.Number}
                                    required="false"
                                    disabled={status ? "active" : ""}
                                />

                                {formik.touched.Number && formik.errors.Number
                                    ? <p className="error-message">{formik.errors.Number}</p> : null}

                            </div>
                            <div className="input-container border--active input-container__center ">
                                <label className='active'>Địa chỉ</label>
                                <input
                                    id="Address"
                                    name="Address"
                                    type="text"
                                    placeholder="Vui lòng nhập địa chỉ..."
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.Address}
                                    required="false"
                                    disabled={status ? "active" : ""}
                                />

                                {formik.touched.Address && formik.errors.Address
                                    ? <p className="error-message">{formik.errors.Address}</p> : null}

                            </div>
                            <div className="input-container border--active">
                                <label className='active'>Ngày sinh</label>
                                <input
                                    id="Birthdate"
                                    name="Birthdate"
                                    type="date"
                                    placeholder="Vui lòng nhập ngày sinh..."
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.Birthdate}
                                    disabled={status ? true : false}
                                />

                                {formik.touched.Birthdate && formik.errors.Birthdate
                                    ? <p className="error-message">{formik.errors.Birthdate}</p> : null}

                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Thay đổi ảnh đại diện</legend>
                            <div className="input__warpper">
                                <div className=" input__avatar">
                                    <img src={image == ""
                                        ? "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/36015793570193.5e6c1151cb04b.png"
                                        : image
                                    } alt="" />
                                </div>
                                <label className={`input__newAvatar ${status ? "" : "active"}`} htmlFor={`input__image`}>
                                    <div className="input__newAvatar__content">
                                        <i class='bx bx-folder-plus' ></i>
                                        <span>Chọn ảnh mới</span>
                                    </div>

                                    <input
                                        type="file"
                                        name='input__image'
                                        id='input__image'
                                        disabled={status ? true : false}
                                        onChange={(e) => handleUploadImage(e.target.files[0])}
                                    />
                                </label>
                            </div>
                        </fieldset>



                    </form>

                </div>

            </SectionBody>
        </div>
    )
}

UserProfile.propTypes = {}

export default UserProfile