import React from 'react'
import PropTypes from 'prop-types'
import "./Bar.scss"
const Bar = props => {
  return (
    <>
        <div class="bar">
            <div class="ball"></div>
            </div>

            <div class="credits">
            Liked my pen? <br />
            <a >Follow me</a> for
            more
            </div>
    </>
  )
}

Bar.propTypes = {}

export default Bar