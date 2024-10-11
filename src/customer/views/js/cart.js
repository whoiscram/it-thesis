import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import jwt_decode from "jwt-decode";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../css/cart.css";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { KeyboardReturnSharp } from "@mui/icons-material";

const Cart = (props) => {
  let history = useHistory();
  //stored product details
  const storedData = JSON.parse(localStorage.cart);
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
    } else {
      window.location.href = "/log-in";
      window.alert("PLEASE LOG IN FIRST");
    }
  }, []);

  function handleClick() {
    history.push({
      pathname: "/checkout",
    });
  }

  function handleDelete(event) {
    rerender(dummyState + 1);
    let localData = localStorage.getItem("cart");
    let newList = JSON.parse(localData);
    let index = newList.findIndex((item) => item.id === event.target.value);
    newList.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(newList));
  }

  const listProduct = Object.entries(storedData).map(([key, value]) => {
    return (
      <tr>
        <td>{value.product}</td>
        <td>{value.quantity}</td>
        <td>₱ {value.price}</td>
        <td>
          {/* <button // svg dont support on click function, image of DELETE can be called here and rendered?
            viewBox="0 0 1024 1024"
            onClick={handleDelete}
            value={value.productID}
          >
            DELETE
          </button> */}
          <svg
            viewBox="0 0 1024 1024"
            className="cart-icon02 button"
            onClick={handleDelete}
            value={value.productID}
          >
            <path d="M662 170h148v86h-596v-86h148l44-42h212zM342 384v426h340v-426h-340zM256 810v-512h512v512q0 34-26 60t-60 26h-340q-34 0-60-26t-26-60z"></path>
          </svg>
        </td>
      </tr>
    );
  });

  const summary = Object.entries(storedData).map(([key, value]) => {
    const qty = value.quantity;
    const price = value.price;

    const Subtotal = qty * price;
    totalSubtotal.push(Subtotal);

    return (
      <tr>
        <td>{value.product}</td>
        <td>{value.quantity}</td>
        <td key={key.productID}> ₱ {Subtotal}</td>
      </tr>
    );
  });

  let sum = 0;
  for (let num of totalSubtotal) {
    sum = sum + num;
  }

  return (
    <div className="cart-container">
      <Helmet>
        <title>Cart</title>
        <meta property="og:title" content="Cart - exported project" />
      </Helmet>
      <Header rootClassName="header-root-class-name16"></Header>
      <div className="cart-container01">
        <div className="cart-container02">
          <div className="cart-container03">
            <span>Cart</span>
            <svg viewBox="0 0 1024 1024" className="cart-icon">
              <path d="M366 708l196-196-196-196 60-60 256 256-256 256z"></path>
            </svg>
            <span>Checkout</span>
          </div>
          <div className="cart-container04">
            <Table hover className="admin-order-view-text07">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>{listProduct}</tbody>
            </Table>
            {/* <div className="cart-container05">
              <input type="checkbox" checked="true" className="cart-checkbox" />
              <div className="cart-container06">
                <span className="cart-text02">Select All (1 item/s)</span>
              </div>
            </div>
            <div className="cart-container07">
              <svg viewBox="0 0 1024 1024" className="cart-icon02">
                <path d="M662 170h148v86h-596v-86h148l44-42h212zM342 384v426h340v-426h-340zM256 810v-512h512v512q0 34-26 60t-60 26h-340q-34 0-60-26t-26-60z"></path>
              </svg>
              <span className="cart-text03">Delete</span>
            </div> */}
          </div>
          {/* <div className="cart-container08">
            <div className="cart-container09">
              <input
                type="checkbox"
                checked="true"
                className="cart-checkbox1"
              />
              <img
                alt="image"
                src="/playground_assets/cleobag-200h.png"
                className="cart-image"
              />
              <div className="cart-container10">
                <span className="cart-text04">Cleo - Red Version</span>
              </div>
            </div>
            <span className="cart-text05">
              <span>₱</span>
              <span>1,300.00</span>
            </span>
            <div className="cart-container11">
              <svg viewBox="0 0 1024 1024" className="cart-icon04">
                <path d="M810 554h-596v-84h596v84z"></path>
              </svg>
              <span className="cart-text08">1</span>
              <svg viewBox="0 0 1024 1024" className="cart-icon06">
                <path d="M810 554h-256v256h-84v-256h-256v-84h256v-256h84v256h256v84z"></path>
              </svg>
            </div>
            <svg viewBox="0 0 1024 1024" className="cart-icon08 button">
              <path d="M662 170h148v86h-596v-86h148l44-42h212zM342 384v426h340v-426h-340zM256 810v-512h512v512q0 34-26 60t-60 26h-340q-34 0-60-26t-26-60z"></path>
            </svg>
          </div> */}
          <div className="cart-container12">
            <Link to="/shop" className="cart-navlink">
              Continue shopping
            </Link>
          </div>
        </div>
        <div className="cart-container13">
          <div className="cart-container14">
            <h1 className="cart-text09">Order Summary</h1>
            <div className="cart-container15">
              <span className="cart-text10">
                SELECTED ({arrayLength} item/s) 
                <Table hover className="admin-order-view-text07">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Quanity</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>{summary}</tbody>
                </Table>
              </span>
            </div>
            <div className="cart-container16">
              <span className="cart-text12">Subtotal</span>
              <span className="cart-text13">₱ {sum}</span>
            </div>
            <button
              className="cart-filled-navlink1 button"
              onClick={handleClick}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
      <Footer rootClassName="footer-root-class-name16"></Footer>
    </div>
  );
};

export default Cart;
