import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import './Icon.scss'

const Icon = props => {
    const icon = props.icon ? props.icon :null;
    const path = props.path ? props.path :"/";
    const quantity = props.quantity ? props.quantity : -1;
    const describe = props.describe ? props.describe :null
  return (
    <Link  to={`${path}`} className={"Icon"}>
        <i className={`${icon}`}></i>
        {
            quantity > 0 && 
            <div className="Icon__quantity ">
                {quantity}
            </div>
        }
        {
            describe && 
            <div className="Icon__desc">
                {describe}
            </div>
        }
        
    </Link>
  )
}

Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    quantity: PropTypes.number,
    // describe: PropTypes.string,
}

export default Icon