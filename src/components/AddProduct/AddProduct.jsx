import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import "./AddProduct.scss"
import Section, { SectionBody, SectionTitle } from '../Section/Section'
import { AddNewProduct, deleteProduct, GetAllProduct, GetProductById, updateProduct } from '../../services/Product/Product'
import { useCallback } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup"
import Button from '../Button/Button/Button'
import CustomSelect from '../FieldCustom/CustomSelect'
import { formatTimestamptoDate } from '../../utils/Format'
import { UploadImagetoCloud } from '../../services/Cloud/Cloud'
import { toast } from 'react-toastify'
const initProduct = {
  Info: {
    Classify: "",
    DayProduce: "",
    Ingerdient: "",
    NameProduct: "",
    Price: 0,
    Image: [],
    PriceDiscount: "",
    Quantity: 0,
    DescriptionProduct: "",
    exp: "",
    mfg: "",
  },
  Pid: ""
}

const options = [
  { value: 'Candy', label: 'Candy' },
  { value: 'Pastry', label: 'Pastry' },
  { value: 'Chocolate', label: 'Chocolate' },
  { value: 'Salty cake', label: 'Salty cake' },
  { value: 'Holiday cake', label: 'Holiday cake' },
]
const AddProduct = props => {
  const [Product, setProduct] = useState([]);
  const [active, setActive] = useState(null);
  const [formProduct, setFormProduct] = useState(initProduct);
  const [status, setStatus] = useState(true);
  const getProduct = async () => {
    const data = await GetAllProduct();
    if (data.success == true) {
      setProduct(data.payload)
    }
  }
  useEffect(() => {
    getProduct()
  }, [])
  // find curreent item in Product
  useEffect(() => {
    if (Product.length > 0 && active) {
      const data = Product.find(item => {
        return item.Pid.includes(active);
      })
      setFormProduct(data);
    }

  }, [active])

  // checked active 
  const handleActive = useCallback((Pid) => {
    setActive(Pid)
    setStatus(true)
  }, [active])

  // check edit = 
  const handleStatus = useCallback(() => {
    setStatus(false)
  }, [active])

  const handleRemoveImage = useCallback((Image) => {
    if (formProduct.Info.Image.length > 1) {
      const initNewProduct = {
        ...formProduct,
        Info: {
          ...formProduct.Info,
          Image: formProduct.Info.Image.filter(image => { return image !== Image })
        }
      }
      setFormProduct(initNewProduct)
    } else {

    }
  }, [formProduct])

  const handleUploadImage = useCallback(async (Avatar) => {
    try {
      const initImage = await UploadImagetoCloud(Avatar);
      console.log(initImage)
      const initNewProduct = {
        ...formProduct,
        Info: {
          ...formProduct.Info,
          Image: [...formProduct.Info.Image, initImage.payload]
        }
      }
      setFormProduct(initNewProduct)

    } catch (e) {
      console.log(e)
    }

  })


  const editProduct = useCallback(() => {
    setActive(null);
    setFormProduct(initProduct);
  }, [active, formProduct]);

  const handleRemoveProduct = async(e, Pid) => {
    e.preventDefault()
    console.log(e,Pid)
    await deleteProduct(Pid)
    await getProduct()
    await editProduct()

    toast.success(`🦄 delete complete ${Pid}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const handleBackupProduct = useCallback(
    async(product)=>{
      console.log("s",product)
      formik.setFieldValue("NameProduct",product.Info.NameProduct)
      formik.setFieldValue("Pid",product.Pid)
      formik.setFieldValue("Classify",product.Info.Classify)
      formik.setFieldValue("DescriptionProduct",product.Info.DescriptionProduct)
      formik.setFieldValue("DayProduce",product.Info.DayProduce)
      formik.setFieldValue("Ingerdient",product.Info.Ingerdient)
      formik.setFieldValue("Price",product.Info.Price)
      formik.setFieldValue("Quantity",product.Info.Quantity)
      formik.setFieldValue("exp",formatTimestamptoDate(product.Info.exp != "" ? product.Info.exp.toDate() : ""))
      formik.setFieldValue("mfg",formatTimestamptoDate(product.Info.mfg != "" ? product.Info.mfg.toDate() : ""))
      setStatus(true)
    },[formProduct]
  ) 

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      Classify: formProduct.Info.Classify,
      DescriptionProduct: formProduct.Info.DescriptionProduct,
      DayProduce: formProduct.Info.DayProduce,
      Ingerdient: formProduct.Info.Ingerdient,
      NameProduct: formProduct.Info.NameProduct,
      Price: formProduct.Info.Price,
      Quantity: formProduct.Info.Quantity,
      exp: formatTimestamptoDate(formProduct.Info.exp != "" ? formProduct.Info.exp.toDate() : ""),
      mfg: formatTimestamptoDate(formProduct.Info.mfg != "" ? formProduct.Info.mfg.toDate() : ""),
      Pid: formProduct.Pid,
    },

    // validationSchema: Yup.object({
    //   Classify: Yup.string().required("Vui lòng nhập loại"),
    //   DescriptionProduct: Yup.string().required("Vui lòng nhập Mô tả"),
    //   Ingerdient: Yup.string().required("Vui lòng nhập nguyên liệu"),
    //   NameProduct: Yup.string().required("Vui lòng nhập tên"),
    //   Price: Yup.number().required("Vui lòng nhập giá"),
    //   Quantity: Yup.number().required("Vui lòng nhập số lượng"),
    //   exp: Yup.string().required("Vui lòng nhập thời gian sử dụng"),
    //   mfg: Yup.string().required("Vui lòng nhập thời gian sử dụng"),
    // }),
    onSubmit: async (values) => {
      try {
        console.log("value", values)

        if (active == null) {
          console.log("new product")
          if (formProduct.Info.Image.length === 0) {
            toast.error('Please select at least 1 photo !', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            return;
          }
          // add new product
          const initNewProduct = await AddNewProduct({
            NameProduct: values.NameProduct,
            DescriptionProduct: values.DescriptionProduct,
            Ingerdient: values.Ingerdient,
            Price: values.Price,
            Quantity: values.Quantity,
            ImageIdProduct: formProduct.Info.Image,
            exp: values.exp,
            mfg: values.mfg,
            Classify: values.Classify,
          })
          toast.success(`🦄 add complete ${values.NameProduct}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          // reset ui 
          editProduct()
          formik.values.NameProduct = ""
          formik.values.DescriptionProduct = ""
          formik.values.Ingerdient = ""
          formik.values.NameProduct = ""
          formik.values.Classify = ""
          formik.values.Price = 1
          formik.values.Quantity = 1
          formik.values.exp = ""
          formik.values.mfg = ""

        } else {
          console.log("updata ui")
          const initNewProduct = await updateProduct(`${values.Pid}`, {
            NameProduct: values.NameProduct,
            DescriptionProduct: values.DescriptionProduct,
            Ingerdient: values.Ingerdient,
            Price: values.Price,
            Quantity: values.Quantity,
            ImageIdProduct: formProduct.Info.Image,
            exp: values.exp,
            mfg: values.mfg,
            Classify: values.Classify,
          },)
          console.log(initNewProduct)
          toast.success(`🦄 updata complete ${values.NameProduct}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }

      } catch (err) {
        console.log(err);
      } finally {

        getProduct();
        setStatus(true)
      }

      // addNewProduct()

    },
    
  })

  console.log("dtas", formProduct)
  return (
    <div className='AddProduct'>
      <div className='Colection AddProduct__list'>
        <>
          <SectionTitle>
            <div className='AddProduct__title'>
              <span>
                Colection
              </span>
              <i className={`bx bx-plus ${active == null ? "active" : ""}`} onClick={(e) => editProduct()} ></i>
            </div>


          </SectionTitle>
          <SectionBody>
            <div className="Colection__list">
              {
                Product && Product.map((item) => {
                  return (
                    <div className={`Colection__item ${item.Pid.includes(active) ? "active" : ""}`}
                      onClick={(e) => handleActive(item.Pid)}
                      key={item.Pid}
                    >
                      <div className="Colection__item__warpper">
                        <p>{item.Pid}</p>
                        <h2>{item.Info.NameProduct}</h2>
                      </div>
                      <div className="Colection__item__remove" onClick={(e)=>handleRemoveProduct(e,item.Pid)}>
                        <i class='bx bx-minus'></i>
                      </div>
                    </div>
                  )
                })
              }

            </div>
          </SectionBody>
        </>
      </div>
      <div className="AddProduct__From">

        <SectionTitle>
          <div className='AddProduct__title'>

            <span>
              ID
            </span>
            {
              status
                ? <div className="AddProduct__btn" onClick={() => handleStatus()}
                >
                  <Button>Edit</Button>
                </div>
                : 
                  <div className="AddProduct__warpper__btn">
                    <div className="AddProduct__btn" onClick={()=>handleBackupProduct(formProduct)}>
                      <Button>Close</Button>
                    </div>
                    <div className="AddProduct__btn" onClick={formik.submitForm}>
                      <Button>Save</Button>
                    </div>
                    
                  </div>
            }
          </div>
        </SectionTitle>
        <SectionBody>
          <div className="AddProduct__warpper">
            <form action="" className='AddProduct__infomation'>
              <div className="input-container border--active input-container__center ">
                <label>Pid</label>
                <input
                  id=""
                  name="Pid"
                  type="text"
                  placeholder="Pid...."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Pid}
                  required="false"
                  disabled={true}
                />

                {formik.touched.Pid && formik.errors.Pid
                  ? <p className="error-message">{formik.errors.Pid}</p> : null}

              </div>
              <div className="input-container border--active input-container__center">
                <label>NameProduct</label>
                <input
                  id="NameProduct"
                  name="NameProduct"
                  type="text"
                  placeholder="NameProduct"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.NameProduct}
                  disabled={status ? true : false}
                />

                {formik.touched.NameProduct && formik.errors.NameProduct
                  ? <p className="error-message">{formik.errors.NameProduct}</p> : null}

              </div>
              <fieldset>
                <legend>Expiry date</legend>
                <div className="AddProduct__fieldset__warpper">
                  <div className="input-container border--active">
                    <label>exp</label>
                    <input
                      id="exp"
                      name="exp"
                      type="date"
                      placeholder="NameProduct"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.exp}
                      disabled={status ? true : false}
                    />

                    {formik.touched.exp && formik.errors.exp
                      ? <p className="error-message">{formik.errors.exp}</p> : null}

                  </div>
                  <div className="input-container border--active">
                    <label>mfg</label>
                    <input
                      id="mfg"
                      name="mfg"
                      type="date"
                      placeholder="NameProduct"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.mfg}
                      disabled={status ? true : false}
                    />

                    {formik.touched.mfg && formik.errors.mfg
                      ? <p className="error-message">{formik.errors.mfg}</p> : null}

                  </div>
                </div>

              </fieldset>
              <fieldset>
                <legend>Number</legend>
                <div className="AddProduct__fieldset__warpper">
                  <div className="input-container border--active input-container__center">
                    <label>Price</label>
                    <input
                      id="Price"
                      name="Price"
                      type="number"
                      placeholder="Price"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.Price}
                      disabled={status ? true : false}
                      max="9999"
                      min="1"
                    />

                    {formik.touched.Price && formik.errors.Price
                      ? <p className="error-message">{formik.errors.Price}</p> : null}

                  </div>
                  <div className="input-container border--active input-container__center">
                    <label>Quantity</label>
                    <input
                      id="Quantity"
                      name="Quantity"
                      type="number"
                      placeholder="Quantity"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.Quantity}
                      disabled={status ? true : false}
                      max="9999"
                      min="1"
                    />

                    {formik.touched.Quantity && formik.errors.Quantity
                      ? <p className="error-message">{formik.errors.Quantity}</p> : null}

                  </div>
                </div>


              </fieldset>
              <fieldset>
                <legend>Chart</legend>
                <div className="input-container input-container__center">
                  <label> Classify</label>
                  <CustomSelect
                    className='input'
                    onChange={value => formik.setFieldValue('Classify', value.value)}
                    value={formik.values.Classify}
                    options={options}
                    placeholder={" Classify"}
                    disabled={status ? true : false}

                  />
                  {formik.touched.Classify && formik.errors.Classify ? <p className="error-message active__error">{formik.errors.Classify}</p> : null}
                </div>
                <div className="input-container ">
                  <label> Ingerdient</label>
                  <textarea
                    id="Ingerdient"
                    name="Ingerdient"
                    type="text"
                    placeholder="Ingerdient"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Ingerdient}
                    disabled={status ? true : false}
                  />

                  {formik.touched.Ingerdient && formik.errors.Ingerdient
                    ? <p className="error-message">{formik.errors.Ingerdient}</p> : null}

                </div>

                <div className="input-container ">
                  <label>Description</label>
                  <textarea
                    id="DescriptionProduct"
                    name="DescriptionProduct"
                    className='xxl'
                    type="text"
                    placeholder="DescriptionProduct"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.DescriptionProduct}
                    disabled={status ? true : false}
                  />

                  {formik.touched.DescriptionProduct && formik.errors.DescriptionProduct
                    ? <p className="error-message">{formik.errors.DescriptionProduct}</p> : null}

                </div>

              </fieldset>

            </form>
            <div className="AddProduct__list__img">
              <ul>
                {
                  formProduct && formProduct.Info.Image.map((item, index) => {
                    return (
                      <li className='AddProduct__item' key={`${index}__img`} >
                        <img
                          src={item}
                          alt="IMG" />
                        {
                          status == false && <div className="AddProduct__item__remove" onClick={() => handleRemoveImage(item)}>
                            <i class='bx bxs-minus-circle'></i>
                          </div>
                        }

                      </li>
                    )
                  })
                }
               



              </ul>
              <label className="AddProduct__item AddProduct__item__input" htmlFor={`input__image`} >
                  <i class='bx bxs-add-to-queue'></i>
                  <input
                    type="file"
                    name='input__image'
                    id='input__image'
                    disabled={status ? true : false}
                    onChange={(e) => handleUploadImage(e.target.files[0])}

                  />

                </label>
            </div>
          </div>

        </SectionBody>


      </div>
    </div>
  )
}

AddProduct.propTypes = {}

export default AddProduct
