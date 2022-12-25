import React from 'react'
import PropTypes from 'prop-types'
import "./Search.scss"
import { useState } from 'react'
import Section, { SectionBody, SectionTitle } from '../../components/Section/Section'
import Grid from '../../components/Grid/Grid'
import Candy from '../../assets/Img/Candy.jpg'
import Event from '../../assets/Img/event.jpg'
import Pastry from '../../assets/Img/Pastry.jpg'
import Socola from '../../assets/Img/Socola.jpg'
import SaltyCake from '../../assets/Img/Salty-cake.jpg'
import BannerImg from '../../assets/Img/bg-home-2.jpg'
import All from '../../assets/Img/All1.jpg'
import { classifyProduct, searchProduct } from '../../services/Product/Product'
import { v4 } from 'uuid'
import { useEffect } from 'react'
import Posts from '../../components/Posts/Posts'
import ReactPaginate from 'react-paginate'
import ComponentLoading from '../../components/LoadingSkeleton/ComponentLoading/ComponentLoading'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
const listClassify = [
  {
    title:"Toàn Bộ",
    payload:null,
    field:"Classify",
    image:All,
  },
  {
    title:"Kẹo",
    payload:"Candy",
    field:"Classify",
    image:Candy,
  },
  {
    title:"Bánh ngọt",
    payload:"Pastry",
    field:"Classify",
    image:Pastry,
  },
  {
    title:"Bánh mặn",
    payload:"Salty cake",
    field:"Classify",
    image:SaltyCake,
  },
  {
    title:"Chocolate",
    payload:"Chocolate",
    field:"Classify",
    image:Socola,
  },
  {
    title:"Bánh sự kiện",
    payload:"Holiday cake",
    field:"Classify",
    image:Event,
  },

]

const Search = props => {
  const history = useNavigate();
  const [value,SetValue] = useState("")
  const [Products,setProducts] = useState(null);
  const [keywords,setKeywords] = useState(null);

  // ---------------------handle page-------------------------------// 
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]); // product aray
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

  const [currentPosts , setCurrentPosts] = useState([]) //post Array
  const [lenghtPage,setLeghtPage] = useState(0)

  const hanleCurrentPosts = (Products)=>{
    const indexOfLastPost = Number(currentPage * postsPerPage);
    const indexOfFirstPost = Number(indexOfLastPost - postsPerPage);
    const newList =  Products.slice(indexOfFirstPost , indexOfLastPost);
    setCurrentPosts(newList)
    
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
      }
      window.scrollTo(0, 0)
  },[posts,currentPage])

  // setNewPort
  useEffect(()=>{
    hanleCurrentPosts(posts)
    setLeghtPage(Math.ceil(posts.length/postsPerPage))
  },[posts])


//--------------------------------------------------------------//

  const handleSubmit = async(keywords)=>{
      if(keywords == ""){
        setPosts([])
        toast.error('Bạn chưa nhập gì cả ! ', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          toast('🦄 Cùng nhau tìm kiếm sản phẩm khác nhé ', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            setProducts([]);
            setPosts([])
        return;
      }
      const data = await searchProduct(keywords,null,null);
      setKeywords(keywords);
      if(data.success == true && data.payload.length > 0){
        setProducts(data.payload);
        setPosts(data.payload)
      }else{
        toast.error('Sản phẩm không tồn tại ! ', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          toast('🦄 Cùng nhau tìm kiếm sản phẩm khác nhé ', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            setProducts([]);
            setPosts([])
      }
      SetValue("")
      setCurrentPage(1)
      console.log("data",data);    
  }

  const handleClassify = async(Classify,name)=>{
    try{
      const data = await classifyProduct(Classify);
      if(data.payload.length == 0){
        toast.error('Sản phẩm hiện không kinh doanh ', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          toast('🦄 Cùng nhau tìm kiếm sản phẩm khác nhé ', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            return;
      }
      setProducts(data.payload);
      setPosts(data.payload)
      setKeywords(name)
    }catch(e){
      console.log(e)
    }
    
  }
 
  return (
    <div className='Search'>
      <div className="container">
        <div className="Search__top" >
          <div className="Search__top__warpper">
            <h2 className="Search__title">
                Tìm Kiếm Sản Phẩm
            </h2>
            <div className="Search__group">
                <input 
                  type="text"
                  value={value}
                  onChange={(e)=>SetValue(e.target.value)}
                  placeholder="Nhập tên sản phẩm tìm kiếm"
                />
                <button onClick={()=>handleSubmit(value)}>
                  <i class='bx bx-search'></i>
                </button>
            </div>
          </div>
            <img className='Search__bg' src={BannerImg} alt="" />
          
          </div>
          <div className= {`Search__warrper ${posts.length == 0 ? "" :"active"}`}>
            <div className={`Search__View ${posts.length == 0 ? "" :"active"}`}>
                <Section>
                <div className="Search__View__content">
                  <SectionTitle>
                      {`Kết quả tìm kiếm : ${keywords}`}
                  </SectionTitle>
                  {
                        Posts.length > 0 
                        ? <Posts posts={currentPosts}/>
                        : Array(8)
                        .fill(0)
                        .map((item,index)=>{
                          return(
                            <ComponentLoading key={index}/>
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
              </Section>
            </div>
            
                  
          <div className={`Search__bottom ${posts.length == 0 ? "" :"active"}`}>
            <Section>
              <SectionTitle>
                Sản Phẩm Đề Suất 
              </SectionTitle>
              <SectionBody>
                <Grid
                  col={6}
                  mdCol={2}
                  smCol={2}
                  gap={10}
                > 
                  {
                    listClassify.map(((item,index)=>{
                      return(
                        <div 
                          className='Search__opinion'
                          key={index}
                          onClick={()=>handleClassify(item.payload,item.title)}
                        >
                          <img  src={item.image} alt="" />
                          <h2>{item.title}</h2>
                        </div>
                      )
                    }))
                  }
                </Grid> 
              </SectionBody>
            </Section>
          </div>
          </div>
            
      </div>
       
      </div>
    
  )
}

Search.propTypes = {}

export default Search