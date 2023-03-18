import React from 'react'
import PropTypes from 'prop-types'

import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from 'react';
import { GetUserCollection } from '../services/Authencation/User';
import { SignOut } from '../services/Authencation/Authencation';
import { AUTH__REMOVE,AUTH__SET } from '../reducers/type';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContextProvider';
import { useNavigate } from 'react-router';
import {auth} from'../Firebase__config';
import { toast } from 'react-toastify';


const AuthurLayout = props => {
    // console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
    // const [user, loading] = useAuthState(auth);
    // const { Authur, dispatch } = useContext(AuthContext);
    

    // // HANDLE LOGOUT USER
    // const handleSiginOut = async () => {
    //     await SignOut()
    //     dispatch({
    //         type: AUTH__REMOVE,
    //         payload: null,
    //     })
        
    // }
    // console.log("Userrssssfff",user)
    // useEffect(() => {
    //     const handleGetUser = async () => {
    //         try {
    //             if (user) {
    //                 const uid = user.uid;
    //                 const initUser = await GetUserCollection(uid);
    //                 if (initUser.success) {
    //                     dispatch({git status 
    //                         type: AUTH__SET,
    //                         payload: {
    //                             user: {
    //                                 uid: user.uid,
    //                                 user: initUser.payload,
    //                             }
    //                         }
    //                     }) 
    //                 }else {
    //                     console.log("Log outs")
    //                     await handleSiginOut();
    //                     toast.error('🦄Vui lòng đăng kí tài khoảng', {
    //                         position: "top-right",
    //                         autoClose: 5000,
    //                         hideProgressBar: false,
    //                         closeOnClick: true,
    //                         pauseOnHover: true,
    //                         draggable: true,
    //                         progress: undefined,
    //                         theme: "light",
    //                     });
    //                 }

    //             } else {
    //                 handleSiginOut();
    //             }
    //         } catch (error) {
    //             console.log(error)
    //         }

    //     }
    //     handleGetUser();
    //     console.log("use",user)
    // }, [user])

    return (
        <div>{props.children}</div>
    )
}

AuthurLayout.propTypes = {}

export default AuthurLayout