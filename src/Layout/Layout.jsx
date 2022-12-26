import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, useNavigate } from 'react-router-dom'

import MainRoutes from '../routes/MainRoutes'
import { useEffect } from 'react';
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContextProvider';
import { CART__SET } from '../reducers/type';
import { AuthContext } from '../contexts/AuthContextProvider';
import Admin from '../pages/Private/Admin';
import { layouts } from 'chart.js';

const FB = window.FB;
const Header = React.lazy(() => import('../components/Header/Header'));
const Footer = React.lazy(() => import('../components/Footer/Footer'));

const Loading = React.lazy(() => import('../components/Loading/Loading'));

const Layout = props => {
  const { Cart, Cartdispatch } = useContext(CartContext);
  const { Authur } = useContext(AuthContext);
  console.log("lay", Authur)
  // get default cart by local store
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("CART"));
    if (data == null) {
      Cartdispatch({
        type: CART__SET,
        payload: []
      })
    } else {
      Cartdispatch({
        type: CART__SET,
        payload: data
      })
    }

  }, [])
  console.log(Cart)
  //  facebook chat box
  useEffect(() => {
    var chatbox = document.getElementById('fb-customer-chat');
    chatbox.setAttribute("page_id", "110416031802315");
    chatbox.setAttribute("attribution", "biz_inbox");
    window.fbAsyncInit = function() {
      FB.init({
        xfbml            : true,
        version          : 'v15.0'
      });
    };
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, [])

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        {
          Authur.success == true && Authur.payload.user.Role == "Admin"
            ? null
            : <Header />
        }
        <main>
          <div className={`App ${Authur.success == true && Authur.payload.user.Role == "Admin" ? "active" : ""}  `}>
            <MainRoutes />
          </div>
          
          
        </main>
    <div id="fb-root"></div>

    <div id="fb-customer-chat" class="fb-customerchat">
    </div>
        {
          Authur.success == true && Authur.payload.user.Role == "Admin"
            ? null
            : <Footer />
        }

      </Suspense>

    </BrowserRouter>
  )
}

Layout.propTypes = {}

export default Layout