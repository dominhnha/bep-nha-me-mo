import React,{useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import Selection, { SectionBody, SectionTitle } from '../../components/Section/Section' 
import "./Product.scss";
import { useCallback } from 'react';
import { v4 } from 'uuid';
import Grid from '../../components/Grid/Grid';
import { classifyProduct, GetAllProduct, searchProduct, sortProduct } from '../../services/Product/Product';
import Posts from '../../components/Posts/Posts';
import ReactPaginate from 'react-paginate';
import ComponentLoading from '../../components/LoadingSkeleton/ComponentLoading/ComponentLoading';
import { async } from '@firebase/util';
import { Link } from 'react-router-dom';
const listClassify = [
  {
    title:"ALL",
    payload:null,
    field:null,
  },
  {
    title:"Kẹo",
    payload:"Candy",
    field:"Classify"
  },
  {
    title:"Bánh ngọt",
    payload:"Pastry",
    field:"Classify"
  },
  {
    title:"Bánh mặn",
    payload:"Salty cake",
    field:"Classify"
  },
  {
    title:"Socola",
    payload:"Chocolate",
    field:"Classify"
  },
  {
    title:"Bánh sự kiện",
    payload:"Holiday cake",
    field:"Classify"
  },

]

const opinionSort = [
  {
    title:"A->B",
    payload:"asc",
    field:"NameProduct"
  },
  {
    title:"B->A",
    payload:"desc",
    field:"NameProduct"
  },
  {
    title:"giá cao đến thấp",
    payload:"asc",
    field:"Price"
  },
  {
    title:"giá cao đến thấp",
    payload:"desc",
    field:"Price"
  },
]
const Product = props => {
   const [Sort,SetSort] = useState("asc")
   const [Classify,SetClassify] = useState(null)
  //  ------------------------Post------------------------
   const [posts, setPosts] = useState([]); // product aray
   const [loading, setLoading] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [postsPerPage] = useState(12);

   const [currentPosts , setCurrentPosts] = useState([]) //post Array
   const [lenghtPage,setLeghtPage] = useState(0)
  //  -----------------------search--------------------------
   const [search,setSearch] = useState(null);

  //  const handleSetSort = useCallback((value)=>{
  //     SetSort(value)
  //  },[])

  //  const handleSetClassify = useCallback((value)=>{
  //     SetClassify(value)
  //  },[])
   // caculater render array 
   const hanleCurrentPosts = (Products)=>{
    const indexOfLastPost = Number(currentPage * postsPerPage);
    const indexOfFirstPost = Number(indexOfLastPost - postsPerPage);
    const newList =  Products.slice(indexOfFirstPost , indexOfLastPost);
    setCurrentPosts(newList)
    console.log(newList);
   }
   // set new number index page +1
   const handlePageClick = async (data) => {
    let initPage = data.selected + 1;
    await setCurrentPage(initPage)
  };
  //  ----------------------------------------------------
  useEffect(()=>{
    if(posts.length>0){
      hanleCurrentPosts(posts)
       // scroll to the top
      window.scrollTo(0, 0)
    }
  },[posts,currentPage])

  //  -----------------------Fetch database---------------
  useEffect(() => {
    const fetchPosts = async () => {
      if(search == null){
        const data = await GetAllProduct();
        setPosts(data.payload);
      }
    };

    fetchPosts();
  }, []);
  // setNewPort
  useEffect(()=>{
    hanleCurrentPosts(posts)
    setLeghtPage(Math.ceil(posts.length/postsPerPage))
  },[posts])
  

  // Classify event 
  const handleClassify = async (queryText,proviso) => {
      try {
        const data = await searchProduct(null,"Classify",proviso);
        console.log("new",data)
        setCurrentPage(data.payload)
      } catch (error) {
        console.log(error);
      }
  }
  // const handleclassify = async(ClassifyName,field,OderBy)=>{
  //   try{
  //     const data = await classifyProduct(ClassifyName,field,OderBy);
  //     console.log(data)
  //     if(data.success == true) {
  //       setPosts(data.payload)
  //     }
  //   }catch(e){
  //     console.log(e)
  //   }
    
  // }
   console.log(posts)
   console.log(currentPosts)
   console.log(currentPage)
  return (
    <Selection className='Product'>
      <div className="container">
        <SectionTitle>
          Sản phẩm
        </SectionTitle>
        <SectionBody >
            <div className="Product__wrapper">
              <div className="Product__sideBar">
                  <Link to={"/Product/Search"}>
                    <div className="Product__group">
                      <input 
                        type="text" 
                        className="Product__input" 
                        placeholder='Tìm Kiếm Sản Phẩm' 
                        value={search}
                        onChange={(e)=>{setSearch(e.target.value)}}
                        />
                      <i class='bx bx-search'></i>
                    </div>
                  </Link>
                  
                  <ul className='Product__opinion'>
                    <div className="Product__opinion__title">
                      {Sort!=null ? <span>{Sort.title}</span>:<span>{`Sắp Xếp Theo`}</span>}
                      <i class='bx bx-chevron-down'></i>
                    </div>
                      <ul className="Product__opinion__sub">
                          {
                            opinionSort.map(item=>{
                              return (
                                <li 
                                  className="Product__opinion__item" 
                                  key={v4()}
                                  onClick={null}
                                  >{item.title}</li>
                              )
                            })
                          }
                      </ul> 
                  </ul>
                  <ul className='Product__opinion'>
                    <div className="Product__opinion__title">
                      {Classify!=null ? <span>{Classify}</span>:<span>{`Loại Bánh`}</span>}
                      <i class='bx bx-chevron-down'></i>

                    </div>
                      <ul className="Product__opinion__sub">
                          {
                            listClassify.map(item=>{
                              return (
                                <li 
                                  keys={v4()}
                                  className="Product__opinion__item"
                                  key={v4()}
                                  onClick={(e)=>handleClassify(item.payload,Sort)}
                                >{item.payload}</li>
                              )
                            })
                          }
                      </ul> 
                  </ul>
                  

              </div>
              <div className="Product__collections">
                <div className="Product__collections__wrapper">
                {
                  Posts.length > 0 
                  ? <Posts posts={currentPosts}/>
                  : Array(8)
                  .fill(0)
                  .map(item=>{
                    return(
                      <ComponentLoading key={v4()}/>
                    )
                  })
                }
                </div>
                <ReactPaginate
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
                />
              </div>
            </div>
        </SectionBody>
        
      </div>

    </Selection>
  )
}

Product.propTypes = {}

export default Product