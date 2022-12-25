import React from 'react'
import PropTypes from 'prop-types'
import "./ComponentLoading.scss"
import { Link } from 'react-router-dom'
import Skeleton from '../EffectLoanding/EffectLoanding'
const ComponentLoading = props => {
  return (
   
 
    <Link to={ "/"} className="ProductCand">
        
        <div className="ProductCand__top">
            <Skeleton height={352}></Skeleton>     
            <div className="ProductCand__content">
               
                <Skeleton></Skeleton>
                    
                <div className="ProductCand__warpper">
                    
                    
                </div>
            </div>
        </div>
        <div className="ProductCand__bottom">
            <Skeleton ></Skeleton>
        </div>
        
        

    </Link>
  )
}

ComponentLoading.propTypes = {}

export default ComponentLoading