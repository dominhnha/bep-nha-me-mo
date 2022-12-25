import React from 'react'
import PropTypes from 'prop-types'
import "./Button.scss"
const Button = props => {
  return (
    <button class="Button" 
        onClick={props.onClick ? (e) => props.onClick(e) : null}
    >
        {props.children}
    </button>
  )
}

Button.propTypes = {}

export default Button