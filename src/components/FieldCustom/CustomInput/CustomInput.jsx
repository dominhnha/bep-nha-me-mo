import React from 'react'
import PropTypes from 'prop-types'
import './CustomInput.scss'

const CustomInput = props => {
    const id = props.id ? props.id : null;
    const name = props.name ? props.name : null;
    const type = props.type ? props.type : null;
    const onChange = props.onChange ? props.onChange : null;
    const value = props.value ? props.value : null;
    const lable = props.lable ? props.lable : null;
    const errormessage = props.errormessage ? props.errormessage : null;
    const onBlur = props.onBlur ? props.onBlur : null;
    const touchedForm = props.touchedForm ? props.touchedForm : null;
    
  return (
    <div className="CustomInput">
          <input 
            id = {id}
            name = {name}
            type={type}
            // placeholder = "Email / Số điện thoại"
            onChange = {onChange}
            onBlur = {onBlur}
            value={value}
            required
          />
          <label className='border-null'>{lable}</label>
          {touchedForm && errormessage ?  <p className="CustomInput-error-message">{errormessage}</p> : null}
    </div>
  )
}

CustomInput.propTypes = {}

export default CustomInput