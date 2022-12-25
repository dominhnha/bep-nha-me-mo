import React, { useCallback, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './Event.scss'
import { Link } from 'react-router-dom'
import EventBanner from '../../assets/Img/EventBanner.jpg'
import Section from '../../components/Section/Section'
import Button from '../../components/Button/Button/Button';
import Grid from '../../components/Grid/Grid';
import ProductCand from '../../components/ProductCand/ProductCand';
import { v4 } from 'uuid';
import ComponentLoading from '../../components/LoadingSkeleton/ComponentLoading/ComponentLoading';
import { classifyProduct } from '../../services/Product/Product';
import ReactPaginate from 'react-paginate'
import Lantern from '../../components/Animation/Lantern/Lantern'


const Event = props => {
  const [Classify, setClassify] = useState([]);
  const [posts, setPosts] = useState([]); // product aray
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const [currentPosts, setCurrentPosts] = useState([]) //post Array
  const [lenghtPage, setLeghtPage] = useState(0)

  const hanleCurrentPosts = (Products) => {
    const indexOfLastPost = Number(currentPage * postsPerPage);
    const indexOfFirstPost = Number(indexOfLastPost - postsPerPage);
    const newList = Products.slice(indexOfFirstPost, indexOfLastPost);
    setCurrentPosts(newList)

  }
  // set new number index page +1
  //  ----------------------------------------------------
  useEffect(() => {
    if (posts.length > 0) {
      hanleCurrentPosts(posts)
      // scroll to the top
    }
    window.scrollTo(0, 0)
  }, [posts, currentPage])

  // setNewPort
  useEffect(() => {
    hanleCurrentPosts(posts)
    setLeghtPage(Math.ceil(posts.length / postsPerPage))
  }, [posts])

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await classifyProduct("Holiday cake");
      setPosts(data.payload);
    };

    fetchPosts();
  }, []);

  const handlePageClick = async (data) => {
    let initPage = data.selected + 1;
    await setCurrentPage(initPage)
  };
  //----------------------------------------------------------------
  useEffect(() => {
    try {
      const getData = async () => {
        const data = await classifyProduct("Holiday cake");
        console.log("data", data);
        if (data.success) setClassify(data.payload);

      }
      getData()

    } catch (e) {
      console.log(e);
    }

  }, [])
  console.log(Classify)

  return (
    <div className="Event">
      <div className="container Event__container">
        <div className="Event__banner">
          <img src={EventBanner} alt="" />
          <div className="Event__banner__title">
            <h1 className="Event__banner__title__text">Xuân Đoàn Viên</h1>
            <h1 className="Event__banner__title__number">2023</h1>
            <div className="Event__banner__Lantern">
              <Lantern/>
            </div>
          </div>

        </div>
        <Section>
          <div className="Event__section">
            <div className="Event__section__top">
              <div className="Event__section__wrapper">
                <h2>Sản Phẩm Giới Hạn Dịp Năm Mới</h2>
                {/* <Link to={"/Product"}>
                  <Button>Xem Thêm</Button>
                </Link> */}
              </div>

            </div>
            <div className="Event__section__bottom">
              <Grid
                col={4}
                mdCol={2}
                smCol={1}
                gap={20}
              >
                {
                  Classify.length > 0
                    ? Classify.map(item => {
                      return (
                        <ProductCand
                          key={v4()}
                          Pid={item.Pid}
                          Name={item.Info.NameProduct}
                          Description={item.Info.DescriptionProduct}
                          Image={item.Info.Image}
                          Price={item.Info.Price}
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
          {/* <ReactPaginate
            previousLabel={<i class='bx bx-chevron-left'></i>}
            nextLabel={<i class='bx bx-chevron-right'></i>}
            breakLabel={"..."}
            pageCount={lenghtPage}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"Product__Page"}
            pageClassName={"Product__Page__item"}
            pageLinkClassName={"Product__Page__link"}
            previousClassName={"Product__Page__item"}
            previousLinkClassName={"Product__Page__link"}
            nextClassName={"Product__Page__item"}
            nextLinkClassName={"Product__Page__link"}
            breakClassName={"Product__Page__item"}
            breakLinkClassName={"Product__Page__link"}
            activeClassName={"active"}
          /> */}
        </Section>
      </div>


    </div>
  )
}

Event.propTypes = {}

export default Event