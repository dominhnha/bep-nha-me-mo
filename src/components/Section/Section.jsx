import React from 'react'
import PropTypes from 'prop-types'
import "./Section.scss"

const Section = props => {
  return (
    <div className='Section'>
         {props.children}
    </div>
  )
}

export const SectionTitle = props =>{
    return(
        <div className='Section__title'>
             {props.children}
        </div>
    )
}
export const SectionBody = props =>{
    return(
        <div className='Section__Body'>
             {props.children}
        </div>
    )
}
Section.propTypes = {}

export default Section