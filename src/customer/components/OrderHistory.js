import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "../../customer/views/css/order-premade.css";
import { baseURL } from "../../config";

const OrderHistory = (props) => {
  console.log(props.data);

  return (
    <div className="order-premade-container05">
      <div className="order-premade-container06">
        <img
          alt="image"
          src={props.data.imageSource}
          className="order-premade-image"
        />
      </div>
      <div className="order-premade-container07">
        <span className="order-premade-text03">{props.data.productName}</span>
        <div className="order-premade-container08">
          <span className="order-premade-text04">
            <span className="order-premade-text05">Total:</span>
            <span className="order-premade-text06">
              <span
                dangerouslySetInnerHTML={{
                  __html: " ",
                }}
              />
            </span>
            <span className="order-premade-text07">₱</span>
            <span className="order-premade-text08">
              {props.data.totalAmount}
            </span>
          </span>
          <span className="order-premade-text09">
            Qty: {props.data.quantity}
          </span>
          <div className="order-premade-container09">
            <span className="order-premade-text10">
              <span className="order-premade-text11">
                Status:
                <span
                  dangerouslySetInnerHTML={{
                    __html: " ",
                  }}
                />
              </span>
              <span className="order-premade-text12">
                {props.data.orderStatus}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

function cardData(posts) {
  var values = Object.values(posts);
  return values.map((info, idx) => {
    return <OrderHistory data={info} key={idx} />;
  });
}

function CardList() {
  const [order, setOrder] = useState([]);
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const decode = jwt_decode(localStorage.getItem("customerToken"));
    const logged = decode.data.ID;
    setTimeout(async () => {
      const url = baseURL + `CRUD.php?orderHistory=${logged}`;
      axios
        .get(url)
        .then((response) => {
          setOrder(response.data);
        })
        .catch((error) => console.error("Error:"));
    }, 100);
  }, []);

  return (
    <div className="shop-container16">
      {/* {JSON.stringify(posts)} */}
      {cardData(order)}
    </div>
  );
}

export default CardList;
