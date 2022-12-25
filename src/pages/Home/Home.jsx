import React, { useCallback, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { AUTH__SET } from '../../reducers/type'
import { AuthContext } from '../../contexts/AuthContextProvider';
import { AddUserAuthencation, SiginUserAuthencation } from '../../services/Authencation/Authencation';
import { async } from '@firebase/util';
import { AddUserCollection, GetToCart, GetUserCollection, setNewCart } from '../../services/Authencation/User';
import {  GetBestsellProduct, getNewProduct, GetProductById, searchProduct, sortProduct } from '../../services/Product/Product';
import pattern from '../../assets/Img/pattern.png'
import object1 from '../../assets/Img/object1.png'
import Slider from '../../components/Slider/Slider';
import ProductCand from '../../components/ProductCand/ProductCand';
import Grid from '../../components/Grid/Grid';
import { v4 } from 'uuid';
import Button from '../../components/Button/Button/Button';
import { Link } from 'react-router-dom';
import ComponentLoading from '../../components/LoadingSkeleton/ComponentLoading/ComponentLoading';
import Section from '../../components/Section/Section'
import "./Home.scss"
const Home = props => {

  const { Authur, dispatch } = useContext(AuthContext);
  const [newProduct, setNewProduct] = useState([]);
  const [bestSale, setBestSale] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    try {
      const getData = async () => {
        const data = await getNewProduct(8);
        if (data.success) setNewProduct(data.payload);

      }
      getData()

    } catch (e) {
      console.log(e);
    }

  }, [])

  useEffect(() => {
    try {
      const getData = async () => {
        const data = await GetBestsellProduct(8);

        if (data.success) setBestSale(data.payload);
      }
      getData()
    } catch (e) {
      console.log(e)
    }

  }, [])
  console.log(newProduct)
  return (
    <div className='Home'>
      {/*---------------- slider----------------- */}
      <Slider>
      </Slider>
      {/*---------------- end Slider------------- */}

      {/* ----------------newproduct---------------- */}
      <div className="container">
        <Section>
          <div className="Home__section">
            <div className="Home__section__top">
              <div className="Home__section__wrapper">
                <h2>Sản phẩm mới</h2>
                <Link to={"/Product/Search"}>
                  <Button>Xem Thêm</Button>
                </Link>
              </div>

            </div>
            <div className="Home__section__bottom">
              <Grid
                col={4}
                mdCol={2}
                smCol={1}
                gap={20}
              >
                {
                  newProduct.length > 0
                    ? newProduct.map(item => {
                      console.log(item.Info.Discount)
                      return (
                        <ProductCand
                          key={v4()}
                          Pid={item.Pid}
                          Name={item.Info.NameProduct}
                          Description={item.Info.DescriptionProduct}
                          Image={item.Info.Image}
                          Price={item.Info.Price}
                          Discount={item.Info.Discount ? item.Info.Discount : 0}
                          sale={30}
                        />
                      )
                    })
                    : Array(8)
                      .fill(0)
                      .map(item => {
                        return (
                          <ComponentLoading key={v4()} />
                        )
                      })
                }
              </Grid>
            </div>
          </div>
        </Section>


        {/* -------------------------------best sale--------------------------------- */}
        <Section>
          <div className="Home__section">
            <div className="Home__section__top">
              <div className="Home__section__wrapper">
                <h2>Sản bán chạy</h2>
                <Link to={"/Product/Search"}>
                  <Button>Xem Thêm</Button>
                </Link>
              </div>

            </div>
            <div className="Home__section__bottom">
              <Grid
                col={4}
                mdCol={2}
                smCol={1}
                gap={20}
              >
                {
                  bestSale.length > 0
                    ? bestSale.map(item => {
                      console.log(item)
                      return (
                        <ProductCand
                          key={v4()}
                          Pid={item.Pid}
                          Name={item.Info.NameProduct}
                          Description={item.Info.DescriptionProduct}
                          Image={item.Info.Image}
                          Price={item.Info.Price}
                          Discount={item.Info.Discount ? item.Info.Discount : 0}
                          sale={30}
                        />
                      )
                    })
                    : Array(8)
                      .fill(0)
                      .map(item => {
                        return (
                          <ComponentLoading key={v4()} />
                        )
                      })
                }
              </Grid>
            </div>
          </div>
        </Section>

      </div>

    </div>
  )
}

Home.propTypes = {}

export default Home