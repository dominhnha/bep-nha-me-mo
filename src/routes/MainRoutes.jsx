import React, { lazy } from 'react'
import PropTypes from 'prop-types'
import { Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContextProvider'








// import Components


const Home = React.lazy(() => import('../pages/Home/Home'))
const Product = React.lazy(() => import('../pages/Product/Product'))
const ProductView = React.lazy(() => import('../pages/ProductView/ProductView'))
const SignIn = React.lazy(() => import('../pages/SignIn/SignIn'))
const SignUp = React.lazy(() => import('../pages/SignUp/SignUp'))
const Cart = React.lazy(() => import('../pages/Cart/Carts'))
const Payment = React.lazy(() => import('../pages/Payment/Payment'))
const Error = React.lazy(() => import('../pages/Error/Error'))

const Search = React.lazy(() => import('../pages/Search/Search'))
const Contact = React.lazy(() => import('../pages/Contact/Contact'))
const Admin = React.lazy(() => import('../pages/Private/Admin'))
const Event = React.lazy(() => import('../pages/Event/Event'))

const Chart= React.lazy(() => import('../components/Chart/Charts'))
const AddProduct = React.lazy(() => import('../components/AddProduct/AddProduct'))
const User = React.lazy(() => import('../pages/User/User'))
const UserProfile = React.lazy(() => import( '../components/UserProfile/UserProfile'))



const MainRoutes = props => {
  const { Authur } = useContext(AuthContext);
  console.log("main",Authur)
  if (Authur.success == true && Authur.payload.user.Role == "Admin") {
    return (
      <Routes>
        <Route exact path='/' element={<Admin />} >
          <Route exact index element={<Chart />}></Route>
          <Route exact path='Product' element={<AddProduct />}></Route>
        </Route>
      </Routes>
    )
  }
  // return(   
  //   <Routes>
  //      <Route exact path='/' element={<Admin/>} >
  //         <Route exact index element={<Chart/>}></Route>
  //         <Route exact path='Product' element={<AddProduct/>}></Route>
  //      </Route>
  //<Route  path='*' element={<Error/>}></Route>
  //   </Routes> 
  //   )
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      {/* product */}
      <Route exact path='/Product'>
        {/* <Route exact index element={<Product />}></Route> */}
        <Route exact path=':slug' element={<ProductView />}></Route>
        <Route exact path='Search' element={<Search />}></Route>
        <Route exact path='Payment' element={<Payment />}></Route>
      </Route>

      {/* Account */}
      <Route exact path='/Account'>
        <Route exact path='SignIn' element={<SignIn />}></Route>
        <Route exact path='SignUp' element={<SignUp />}></Route>
        <Route exact path='Cart' element={<Cart />}></Route>

      </Route>
      <Route exact path='/Contact' element={<Contact />}></Route>
      {/* Event */}
      <Route exact path='/Event' element={<Event />}></Route>
    
      {/* user page */}
      <Route exact path='User' element={<User/>}>
        <Route exact index element={<UserProfile/>}></Route>
      </Route>
      <Route path='*' element={<Error />}></Route>
    </Routes>
  )
}

MainRoutes.propTypes = {}

export default MainRoutes