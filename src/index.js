import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss'
import './assets/boxicons-2.0.7/css/boxicons.min.css'
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from './Layout/Layout';
import AuthurProvider from './contexts/AuthContextProvider'
import CartProvider from './contexts/CartContextProvider';
import PaymentProvider from './contexts/PaymentContextProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <AuthurProvider>
      <CartProvider>
        <PaymentProvider>
          <Layout/>
          <ToastContainer />
        </PaymentProvider>
      </CartProvider>
    </AuthurProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
