import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Helmet } from "react-helmet";
import ImageUploader from "react-images-upload";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Table from "react-bootstrap/Table";
import { baseURL } from "../../../config";
import axios from "axios";
import "../css/checkout.css";

import styled from "styled-components";

const Checkout = (props) => {
  let history = useHistory();
  var storedData = JSON.parse(localStorage.productData);
  var qty = JSON.parse(localStorage.cart);
  const decode = jwt_decode(localStorage.getItem("customerToken"));
  const logged = decode.data.ID;
  const [inputs, setInputs] = useState();
  const [render, setRender] = useState(false);
  const [address, setAddress] = useState();
  const [user, setUser] = useState();

  //handles payment Type
  const [paymentType, setPayment] = useState();
  //handles Delivery Type
  const [deliveryType, setDeliveryType] = useState();
  //dummy state, no need refresh
  const [dummyState, rerender] = useState(1);

  //Count number of Items inside cart
  const count = JSON.parse(localStorage.getItem("cart"));
  //displays lenght of cart
  var arrayLength = count.length;
  // Total Subtotal
  const totalSubtotal = [];

  useEffect(() => {
    if (localStorage.getItem("customerToken") != null) {
      const decode = jwt_decode(localStorage.getItem("customerToken"));
      const logged = decode.data.ID;
      axios
        .get(`${baseURL}CRUD.php?getAddress=${logged}`)
        .then((response) => {
          setAddress(response.data);
        })
        .catch((error) => console.error("Error:"));

      axios
        .get(`${baseURL}CRUD.php?profile=${logged}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => console.error("Error:"));
    } else {
      window.location.href = "/log-in";
      window.alert("PLEASE LOG IN FIRST");
    }
  }, []);

  function handleDelete(event) {
    rerender(dummyState + 1);
    let localData = localStorage.getItem("cart");
    let newList = JSON.parse(localData);
    let index = newList.findIndex((item) => item.id === event.target.value);
    newList.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(newList));
  }

  const listProduct = Object.entries(qty).map(([key, value]) => {
    const qty = value.quantity;
    const price = value.price;

    const Subtotal = qty * price;
    totalSubtotal.push(Subtotal);
    return (
      <tr>
        {/* <td>
          <img
            alt="image"
            src={value.imageSource}
            className="checkout-image2"
          />
        </td> */}
        <td>{value.product}</td>
        <td>₱ {value.price}</td>
        <td>{value.quantity}</td>
        <td>
          <svg
            viewBox="0 0 1024 1024"
            className="checkout-icon06 button"
            onClick={handleDelete}
            value={value.productID}
          >
            <path d="M662 170h148v86h-596v-86h148l44-42h212zM342 384v426h340v-426h-340zM256 810v-512h512v512q0 34-26 60t-60 26h-340q-34 0-60-26t-26-60z"></path>
          </svg>
        </td>
      </tr>
    );
  });
  let sum = 0;
  for (let num of totalSubtotal) {
    sum = sum + num;
  }

  const totalAmount = sum + 130.0;

  //SELECT BUTTON
  const CourierButton = styled.button`
    background-color: var(--dl-color-gray-white);
    color: black;
    display: flex;
    transition: 0.3s;
    border-width: 0px;
    border-radius: var(--dl-radius-radius-radius8);
    flex-direction: row;
    border-color: var(--dl-color-inabelpalette-main);
    align-items: center;
    padding-right: 2rem;
    &:disabled {
      color: grey;
      opacity: 0.7;
      cursor: default;
    }
  `;
  const PaymentButton = styled.button`
    background-color: var(--dl-color-gray-white);
    width: 20rem;
    display: flex;
    align-self: center;
    transition: 0.3s;
    align-items: center;
    border-width: 0px;
    margin-bottom: 0.5rem;
    flex-direction: row;
    justify-content: flex-start;
    border-color: var(--dl-color-inabelpalette-main);
    border-radius: var(--dl-radius-radius-radius8);
    &:disabled {
      color: grey;
      opacity: 0.7;
      cursor: default;
    }
  `;

  const PaymentButtonToggle = styled(PaymentButton)`
    border-width: 0px;
    border-color: transparent;
    opacity: 0.7;
    ${({ active }) =>
      active &&
      `
      border-width: 3px;
      border-color: var(--dl-color-inabelpalette-main);
      opacity: 1;
    `}
  `;

  const CourierButtonToggle = styled(CourierButton)`
    border-width: 0px;
    border-color: transparent;
    opacity: 0.7;
    ${({ active }) =>
      active &&
      `
      border-width: 3px;
      border-color: var(--dl-color-inabelpalette-main);
      opacity: 1;
    `}
  `;

  const PaymentButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
  `;

  const CourierButtonGroup = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    margin-top: 0.5rem;
    align-items: center;
    padding-left: 1rem;
    margin-bottom: 0.5rem;
    padding-right: 1rem;
    justify-content: space-between;
  `;

  const payment = [
    [
      <img
        alt="image"
        src="/playground_assets/gcash-200h.png"
        className="checkout-image3"
      />,
      "GCash",
      "\n(+639484177978)",
    ],
    [
      <img
        alt="image"
        src="/playground_assets/bdo-200h.png"
        className="checkout-image4"
      />,
      "BDO",
    ],
    [
      <img
        alt="image"
        src="/playground_assets/landbank-200h.png"
        className="checkout-image5"
      />,
      "LandBank",
    ],
  ];

  const courier = [
    [
      <img
        alt="image"
        src="/playground_assets/j%26t-200h.png"
        className="checkout-image"
      />,
      "J&T",
    ],
    [
      <img
        alt="image"
        src="/playground_assets/jrs-200h.png"
        className="checkout-image1"
      />,
      "JRS",
    ],
  ];

  // needs const to catch data (state)
  function getPayment(data) {
    if (data == 0) {
      console.log("Gcash");
      setPayment("Gcash");
    }

    if (data == 1) {
      console.log("BDO");
      setPayment("BDO");
    }
    if (data == 2) {
      console.log("LandBank");
      setPayment("LandBank");
    }
  }

  // needs const to catch data (state)
  function getDeliveryOpt(data) {
    // setDeliveryType(data);

    if (data == 0) {
      console.log("J&T");
      setDeliveryType("J&T");
    }

    if (data == 1) {
      console.log("JRS");
      setDeliveryType("JRS");
    }
  }

  function PaymentToggleGroup() {
    const [active, setActive] = useState(payment[0]); //TBD design
    return (
      <PaymentButtonGroup>
        {payment.map((type, value) => (
          <PaymentButtonToggle
            key={type}
            value={value}
            active={active === type}
            onClick={(va) => {
              setActive(type);
              getPayment(va.target.value);
            }}
          >
            {type}
          </PaymentButtonToggle>
        ))}
      </PaymentButtonGroup>
    );
  }

  function CourierToggleGroup() {
    const [active, setActive] = useState(courier[0]); //TBD design
    return (
      <CourierButtonGroup>
        {courier.map((type, value) => (
          <CourierButtonToggle
            key={type}
            value={value}
            active={active === type}
            onClick={(va) => {
              setActive(type);
              getDeliveryOpt(va.target.value);
            }}
          >
            {type}
          </CourierButtonToggle>
        ))}
      </CourierButtonGroup>
    );
  }

  //productId
  const productId = storedData.productID;
  const productQuantity = qty.quantity;
  const array = {
    productId,
    qty,
    productQuantity,
    totalAmount,
    logged,
    address,
    paymentType,
    deliveryType,
    inputs,
  };

  function handlePlaceOrder() {
    if (inputs.RefCode != "") {
      axios
        .post(`${baseURL}CRUD.php?addOrderFromCheckout=${totalAmount}`, array)
        .then((response) => {
          console.log(response.data);
          localStorage.removeItem("cart");
          window.alert("Order Placed");
          history.push("/shop");
        })
        .catch((error) => console.error("Error:"));
    } else {
      window.alert("Please Fill out The Reference Code");
      location.reload();
    }
  }

  function handleInputs(event) {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  }

  return (
    <div className="checkout-container">
      <Helmet>
        <title>Checkout</title>
        <meta property="og:title" content="Checkout - exported project" />
      </Helmet>
      <Header rootClassName="header-root-class-name16"></Header>
      <div className="checkout-container01">
        <div className="checkout-container02">
          <div className="checkout-container03">
            <Link to="/cart" className="checkout-navlink">
              Cart
            </Link>
            <svg viewBox="0 0 1024 1024" className="checkout-icon">
              <path d="M366 708l196-196-196-196 60-60 256 256-256 256z"></path>
            </svg>
            <span>Checkout</span>
          </div>
          <div className="checkout-container04">
            <div className="checkout-container05">
              <span className="checkout-text01">Shipping Address</span>
              <button className="checkout-button button">CHANGE ADDRESS</button>
            </div>
            <div className="checkout-container06">
              <span className="checkout-text03">
                {user?.firstName}, {user?.lastName}
              </span>
              <span className="checkout-text04">{user?.phoneNumber}</span>
            </div>
            <span className="checkout-text04">
              #{address?.[0].houseNo} , {address?.[0].street},{" "}
              {address?.[0].barangay}, {address?.[0].city},{" "}
              {address?.[0].region}
            </span>
          </div>
          <div className="checkout-container07">
            <div className="checkout-container08">
              <span className="checkout-text05">
                Choose your delivery option:
              </span>
            </div>
            <div className="checkout-container09">
              <CourierToggleGroup />
            </div>
          </div>
          <div className="checkout-container10">
            <div className="checkout-container11">
              <span className="checkout-text08">Order</span>
            </div>
            <div className="checkout-container12">
              <Table hover className="admin-order-view-text07">
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{listProduct}</tbody>
              </Table>
            </div>
          </div>
        </div>
        <div className="checkout-container16">
          <div className="checkout-container17">
            <h1 className="checkout-text15">Step 1: Select Payment Method</h1>
            <PaymentToggleGroup />
            <div className="checkout-container18">
              <h1 className="checkout-text19">Step 2: Enter Reference Code</h1>
              <div className="checkout-container19">
                <input
                  type="text"
                  name="RefCode"
                  required
                  placeholder="ex: ETU48H"
                  onChange={handleInputs}
                />
              </div>
            </div>
            {render ? <Render /> : null}
            <div className="checkout-container20">
              <h1 className="checkout-text21">Invoice and Contact Info</h1>
              <h1 className="checkout-text22">Edit</h1>
            </div>
            <h1 className="checkout-text23">Order Summary</h1>
            <div className="checkout-container21">
              <span className="checkout-text24">
                Subtotal ({arrayLength} item/s)  
              </span>
              <span className="checkout-text25">₱ {sum}</span>
            </div>
            <div className="checkout-container22">
              <span className="checkout-text26">Shipping Fee</span>
              <span className="checkout-text27">₱160.00</span>
            </div>
            <div className="checkout-container23">
              <span className="checkout-text28">Total </span>
              <span className="checkout-text29">₱ {totalAmount}</span>
            </div>
            <button
              className="checkout-button6 button"
              onClick={handlePlaceOrder}
            >
              PLACE ORDER NOW
            </button>
          </div>
        </div>
      </div>
      <Footer rootClassName="footer-root-class-name16"></Footer>
    </div>
  );
};

export default Checkout;
