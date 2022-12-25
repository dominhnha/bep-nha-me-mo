import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import "./ProductCand.scss"
import Button from '../Button/Button/Button'
import { Link } from 'react-router-dom'
import Skeleton from '../../components/LoadingSkeleton/EffectLoanding/EffectLoanding'
import {formatNumber } from '../../utils/Format'
const ProductCand = props => {
    const [Pid,setPid] = useState(null)
    const [Name,setName] = useState(null)
    const [Description,setDescription] = useState(null)
    const [Image,setImage] = useState(null)
    const [Price,setPrice] = useState(null)
    const [discount,setDiscount] = useState(0)
    useEffect(()=>{
        setPid(props.Pid ? props.Pid : null)
        setImage(props.Image ? props.Image[0] : null)
        setDescription(props.Description ?props.Description : null)
        setName(props.Name ? props.Name : null)
        setPrice(props.Price ?  props.Price : null)
        setDiscount(props.Discount ? props.Discount : 0)
        
    },[])
   console.log()
  return (
    <Link to={ Pid ? `/Product/${Pid}` :"/"} className="ProductCand">
        
        <div className="ProductCand__top">
            {
                //
                Image 
                ? <img loading="lazy" className='ProductCand__img' src={Image} alt="" />
                : <Skeleton height={352}></Skeleton>
            }
            <div className="ProductCand__content">
                {
                    Name
                    ? <div className="ProductCand__title">{Name}</div>
                    : <Skeleton></Skeleton>
                }       
                <div className="ProductCand__warpper">
                    {
                        Description
                        ?<p className="ProductCand__desc">
                            {Description}
                        </p>
                        : null
                    }
                </div>
            </div>
        </div>
        <div className="ProductCand__bottom">
            {
                Price
                ? <div className="ProductCand__bottom__warpper">
                    <div className="ProductCand__price">{discount !== 0 ? formatNumber ((Price*(1-discount))):formatNumber (Price) }₫</div>
                    <div className="ProductCand__price--sale">{discount !== 0 ? formatNumber (Price) :null } {discount !== 0 ?"₫":""}</div>
                </div>
                : <Skeleton ></Skeleton>
            }
        </div>
    </Link>
  )
}

ProductCand.propTypes = {
    Name:PropTypes.string.isRequired,
    Description:PropTypes.string.isRequired,
    Image:PropTypes.array,
    Price:PropTypes.string,  
}

export default ProductCand