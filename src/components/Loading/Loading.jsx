import React from 'react'
import PropTypes from 'prop-types'
import './Loading.scss'
const Loading = props => {
  return (
    <div className="backgroud">
        <div className="dashed-loading"></div>
    </div>
  )
}

Loading.propTypes = {}

export default Loading