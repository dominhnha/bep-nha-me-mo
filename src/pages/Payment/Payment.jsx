import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Payment.scss";
import Section, {
  SectionBody,
  SectionTitle,
} from "../../components/Section/Section";
import CustomSelect from "../../components/FieldCustom/CustomSelect";
import { PaymentContext } from "../../contexts/PaymentContextProvider";
import { v4 } from "uuid";
import Sea from "../../components/Animation/Sea/Sea";
import { Link, useNavigate } from "react-router-dom";
import { convertVNDtoUSD, formatNumber } from "../../utils/Format";
import Button from "../../components/Button/Button/Button";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { AddPurchaseHistoryForUser } from "../../services/Authencation/User";
import { CartContext } from "../../contexts/CartContextProvider";
import { CART__REMOVE } from "../../reducers/type";
import { CheckDiscount } from "../../services/Authencation/Discount";
import { PayPalButton } from "react-paypal-button-v2";

const options = [
  { value: "advance", label: "Thanh toán trước khi nhận hàng" },
  { value: "later", label: "Thanh toán sau khi nhận hàng" },
];
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const Payment = (props) => {
  const { Payment, Paymentdispatch } = useContext(PaymentContext);
  const { Cart, Cartdispatch } = useContext(CartContext);
  const { Authur, dispatch } = useContext(AuthContext);
  const [Total, setTotal] = useState(0);
  const history = useNavigate();

  console.log(process.env.REACT_APP_PAYPAL_ID);
  useEffect(() => {
    if (Payment.success == true && Payment.payload.length > 0) {
      let tmp = 0;
      Payment.payload.map((item) => {
        const curTotal = Number(item.Price) * Number(item.Quantity);
        tmp += curTotal;
      });
      setTotal(tmp);
    }
  }, [Payment]);

  const handlePayPalCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: `${convertVNDtoUSD(Total)}`,
            currency_code: "USD",
          },
        },
      ],
    });
  };

  const handlePayPalApprove = async (data, actions) => {
    return actions.order.capture().then(async function (details) {
      // Show a success message to your buyer
      let total = 0;
      const initCart = Payment.payload.map((item) => {
        const tmp = Number(item.Price) * Number(item.Quantity);
        total += tmp;
        const initItem = {
          pid: item.Pid,
          quantity: Number(item.Quantity),
        };
        return initItem;
      });
      let discount = 0;
      if (formik.values.voucher.trim() != "") {
        discount = await CheckDiscount(formik.values.voucher.trim());
        if (discount == 0) {
          toast.error("Mã giảm giá không hợp lệ", {
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

      }
      total = total * (1 - discount);

       // user login
       if (Authur.success == true && Payment.success == true) {
        await AddPurchaseHistoryForUser(
          Authur.payload.uid,
          true,
          {
            emailOrPhone: formik.values.emailOrPhoneNumber,
            Address: formik.values.address,
            Total: total,
            PriceDiscount: discount,
            FullName: Authur.payload.user.FullName,
            Payments: formik.values.delivery,
          },
          initCart
        );
      } else {
        // authr false code here
        const user = v4();

        await AddPurchaseHistoryForUser(
          user,
          false,
          {
            emailOrPhone: `${formik.values.emailOrPhoneNumber}`,
            Address: formik.values.address,
            Total: total,
            PriceDiscount: discount,
            FullName: user,
            Payments: formik.values.delivery,
          },
          initCart
        );
      }
      // remove item in cart
      Payment.payload.map((item) => {
        Cartdispatch({
          type: CART__REMOVE,
          payload: item.Pid,
        });
      });
      toast.success("🦄 Mua hàng thành công!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      history("/");

      // OPTIONAL: Call your server to save the transaction
      //   code is here
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      emailOrPhoneNumber:
        Authur.success == true ? Authur.payload.user.Number : "",
      address: Authur.success == true ? Authur.payload.user.Address : "",
      delivery: "later",
      voucher: "",
    },
    validationSchema: Yup.object({
      emailOrPhoneNumber: Yup.string()
        .required("Vui lòng nhập số điện thoại")
        .matches(phoneRegExp, "Vui lòng nhập số điện thoại")
        .min(9, "ít nhất là 10 số")
        .max(11, "nhiều nhấp là 10 số "),
      address: Yup.string().required("Địa chỉ không được bỏ trống"),
      delivery: Yup.string().required(
        "Phương thức thanh toán không được bỏ trống"
      ),
    }),

    onSubmit: useCallback(
      async (values) => {
        try {
          console.log(
            values.emailOrPhoneNumber,
            values.address,
            values.delivery
          );
          let total = 0;
          const initCart = Payment.payload.map((item) => {
            const tmp = Number(item.Price) * Number(item.Quantity);
            total += tmp;
            const initItem = {
              pid: item.Pid,
              quantity: Number(item.Quantity),
            };
            return initItem;
          });
          let discount = 0;
          if (values.voucher.trim() != "") {
            discount = await CheckDiscount(values.voucher.trim());
            if (discount == 0) {
              toast.error("Mã giảm giá không hợp lệ", {
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
          }
          total = total * (1 - discount);
          // user login
          if (Authur.success == true && Payment.success == true) {
            await AddPurchaseHistoryForUser(
              Authur.payload.uid,
              true,
              {
                emailOrPhone: values.emailOrPhoneNumber,
                Address: values.address,
                Total: total,
                PriceDiscount: discount,
                FullName: Authur.payload.user.FullName,
                Payments: values.delivery,
              },
              initCart
            );
          } else {
            // authr false code here
            const user = v4();

            await AddPurchaseHistoryForUser(
              user,
              false,
              {
                emailOrPhone: `${values.emailOrPhoneNumber}`,
                Address: values.address,
                Total: total,
                PriceDiscount: discount,
                FullName: user,
                Payments: values.delivery,
              },
              initCart
            );
          }
          // remove item in cart
          Payment.payload.map((item) => {
            Cartdispatch({
              type: CART__REMOVE,
              payload: item.Pid,
            });
          });
          toast.success("🦄 Mua hàng thành công!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          history("/");
          // code here

          console.log(Payment.payload);
        } catch (e) {
          console.log(e);
          toast.error("Đã xảy ra lỗi vui lòng thử lại", {
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
        // AddPurchaseHistoryForUser
      },
      [Payment]
    ),
  });

  return (
    <div className="Payment">
      <div className="container Payment__container">
        <div className="Payment__infomation">
          <Section>
            <SectionTitle>Thông tin khách hàng</SectionTitle>
            <form action="">
              <div className="Payment__group input-container border--active">
                <input
                  id="emailOrPhoneNumber"
                  name="emailOrPhoneNumber"
                  type="number"
                  max="999999999999"
                  // placeholder = "Email / Số điện thoại"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.emailOrPhoneNumber}
                  required
                />
                <label>Số điện thoại</label>
                {formik.touched.emailOrPhoneNumber &&
                formik.errors.emailOrPhoneNumber ? (
                  <p className="error-message">
                    {formik.errors.emailOrPhoneNumber}
                  </p>
                ) : null}
              </div>
              <div className=" Payment__group input-container border--active">
                <input
                  id="address"
                  name="address"
                  type="text"
                  // placeholder = "Email / Số điện thoại"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                  required
                />
                <label>Địa Chỉ</label>
                {formik.touched.address && formik.errors.address ? (
                  <p className="error-message">{formik.errors.address}</p>
                ) : null}
              </div>
              <div className="Payment__group input-container">
                <CustomSelect
                  className="input"
                  onChange={(value) =>
                    formik.setFieldValue("delivery", value.value)
                  }
                  value={formik.values.delivery}
                  options={options}
                  placeholder={"Hình thức thánh toán"}
                />
                {formik.touched.delivery && formik.errors.delivery ? (
                  <p className="error-message active__error__xl">
                    {formik.errors.delivery}
                  </p>
                ) : null}
              </div>
              {/* <button type="submit" onClick={formik.handleSubmit}>Đăng Nhập</button> */}
            </form>
          </Section>
          <Section>
            <SectionTitle>Mã giảm giá </SectionTitle>
            <div className="Payment__group input-container border--active">
              <input
                id="voucher"
                name="voucher"
                type="text"
                // placeholder = "Email / Số điện thoại"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.voucher}
                required
              />
              <label>Nhập mã giảm giá để được ưu đãi nhé </label>
            </div>
          </Section>
        </div>
        <div className="Payment__Product">
          <Section>
            <SectionTitle> Hóa đơn sản phẩm</SectionTitle>
            <SectionBody>
              {Payment.success == true && Payment.payload.length > 0 ? (
                <div className="Payment__Product__list">
                  {Payment.payload.map((item) => {
                    const total = formatNumber(
                      Number(item.Price) * Number(item.Quantity)
                    );
                    return (
                      <div className="Payment__Product__item">
                        <div className="Payment__Product__wrapper">
                          <div className="Payment__Product__img">
                            <img src={item.Image[0]} alt="" />
                          </div>
                          <div className="Payment__Product__content">
                            {/* <p>{item.Pid}</p> */}
                            <h2>{item.NameProduct}</h2>
                            <p>Số lượng: {item.Quantity}</p>
                          </div>
                        </div>

                        <div className="Payment__Product__price">
                          <p>{formatNumber(total)}₫</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="Payment__Product__404">
                  <Sea></Sea>
                  <h2>Rất tiếc bạn chưa chọn sản phẩm để thanh toán </h2>
                  <Link to={"/Account/Cart"}>Cùng quay lại giỏ hàng nhé !</Link>
                </div>
              )}
            </SectionBody>
            <SectionTitle>
              <div className="Payment__total">
                <div className="Payment__total__warpper">
                  <h2>Tổng tiền</h2>
                  <span>{formatNumber(Total)}₫</span>
                </div>

                <div
                  className="Payment__total__button"
                  onClick={formik.handleSubmit}
                >
                  {formik.values.delivery == "advance" ? (
                    <PayPalButton
                      createOrder={(data, actions) =>
                        handlePayPalCreateOrder(data, actions)
                      }
                      onApprove={(data, actions) =>
                        handlePayPalApprove(data, actions)
                      }
                      commit={true}
                      options={{
                        clientId: process.env.REACT_APP_PAYPAL_ID,
                        currency: "USD",
                      }}
                    ></PayPalButton>
                  ) : (
                    <Button>Mua Ngay</Button>
                  )}
                </div>
              </div>
            </SectionTitle>
          </Section>
        </div>
      </div>
    </div>
  );
};

Payment.propTypes = {};

export default Payment;
