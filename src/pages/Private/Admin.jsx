import React from 'react'
import PropTypes from 'prop-types'
import SideBar from '../../components/SideBar/SideBar'
import { Outlet } from 'react-router'
import "./Admin.scss"
import Section, { SectionTitle } from '../../components/Section/Section'
const Admin = props => {
  return (
    <div className='Admin'>
        <div className="Admin__siderBar">
          <SideBar/>
        </div>
        <div className="Admin__view">
          <>
            <Outlet/>
          </> 
        </div>
    </div>
  )
}

Admin.propTypes = {}

export default Admin