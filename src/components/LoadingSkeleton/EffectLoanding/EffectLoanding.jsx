import React from 'react'
import PropTypes from 'prop-types'
import './EffectLoanding.scss'
const EffectLoanding = props => {
    const Height = props.height ? props.height : "30";
    const loadingStyle = {
        height:`${Height}px` 
    }
  return (
    <div class="skeleton skeleton-text" style={loadingStyle} ></div>
  )
}

EffectLoanding.propTypes = {}

export default EffectLoanding