import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { baseURL } from "../../../../../config";
import "../../display/css/view-order.css";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminOrderView = (props) => {
  const { data } = props;

  const [user, setUsers] = useState([]);
  const [order, setOrder] = useState([]);
  const [product, setProduct] = useState([]);
  const [payment, setPayment] = useState([]);

  //
  let df = 90;
  let sb = data[1];
  let total = sb + df;

  useEffect(() => {
    setTimeout(async () => {
      const url = `${baseURL}CRUD.php?viewOrder=${data[2]}`;
      //const url = `http://localhost/it-project-ini/php/CRUD.php?viewOrder=${data[2]}`;
      axios
        .get(url)
        .then((response) => {
          setOrder(response.data);
          axios.get(`${baseURL}CRUD.php?profile=` + data[2]).then((res) => {
            setUsers(res.data);
          });
          axios
            .get(baseURL + "CRUD.php?productList=" + data)
            .then((response) => {
              setProduct(response.data);
            })
            .catch((error) => console.error("Error:"));
        })
        .catch((error) => console.error("Error:"));
    }, 100);
  }, []);

  useEffect(() => {
    setTimeout(async () => {
      const url = `${baseURL}getPayment.php?orderID=${data[0]}`;

      axios
        .get(url)
        .then((response) => {
          setPayment(response.data);
        })
        .catch((error) => console.error("Error:"));
    }, 100);
  }, []);

  const listItems = product.map((element) => {
    let x = element.price;
    let y = element.quantity;
    let z = y * x;
    return (
      <tr>
        <td>{element.productName}</td>
        <td>{element.quantity}</td>
        <td>{element.price}</td>
        <td>{z}</td>
      </tr>
    );
  });

  return (
    <div className="admin-order-view-container">
      <Helmet>
        <title>Inabel ni Ina View Order</title>
        <meta property="og:title" content="Inabel ni Ina View Order" />
      </Helmet>
      <div className="admin-order-view-container1">
        <div className="admin-order-view-header">
          <h1 className="admin-order-view-text">ORDER DETAILS</h1>
          <svg
            viewBox="0 0 804.5714285714286 1024"
            className="admin-order-view-icon"
            onClick={props.handleClose}
          >
            <path d="M741.714 755.429c0 14.286-5.714 28.571-16 38.857l-77.714 77.714c-10.286 10.286-24.571 16-38.857 16s-28.571-5.714-38.857-16l-168-168-168 168c-10.286 10.286-24.571 16-38.857 16s-28.571-5.714-38.857-16l-77.714-77.714c-10.286-10.286-16-24.571-16-38.857s5.714-28.571 16-38.857l168-168-168-168c-10.286-10.286-16-24.571-16-38.857s5.714-28.571 16-38.857l77.714-77.714c10.286-10.286 24.571-16 38.857-16s28.571 5.714 38.857 16l168 168 168-168c10.286-10.286 24.571-16 38.857-16s28.571 5.714 38.857 16l77.714 77.714c10.286 10.286 16 24.571 16 38.857s-5.714 28.571-16 38.857l-168 168 168 168c10.286 10.286 16 24.571 16 38.857z"></path>
          </svg>
        </div>
        <div className="admin-order-view-view-order">
          <div className="admin-order-view-order-status-container">
            <div className="admin-order-view-container2">
              <div className="admin-order-view-status">
                <div className="admin-order-view-background">
                  <h3 className="admin-order-view-title">Order Status</h3>
                </div>
                <span className="admin-order-view-text001">
                  <span className="admin-order-view-text002">
                    {order.orderStatus}
                  </span>
                  <br></br>
                </span>
              </div>
            </div>
          </div>
          <div className="admin-order-view-order-details">
            <div className="admin-order-view-background1">
              <h3 className="admin-order-view-title1">Order Details</h3>
            </div>
            <div className="admin-order-view-details">
              <div className="admin-order-view-user-name-container">
                <label className="admin-order-view-text004">
                  <span>Order Type:</span>
                  <br></br>
                </label>
                <label className="admin-order-view-text007">
                  <span>{order.orderType}</span>
                  <br></br>
                </label>
              </div>
              <div className="admin-order-view-order-breakdown-container">
                <Table hover className="admin-order-view-text07">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Sub Total</th>
                    </tr>
                  </thead>
                  <tbody>{listItems}</tbody>
                </Table>
              </div>
              <div className="admin-order-view-user-name-container1">
                <label className="admin-order-view-text013">
                  <span>Sub Total</span>
                  <br></br>
                </label>
                <label className="admin-order-view-text016">
                  <span>₱‎{sb}</span>
                  <br></br>
                </label>
              </div>
              <div className="admin-order-view-user-name-container2">
                <label className="admin-order-view-text019">
                  <span>Delivery Fee</span>
                  <br></br>
                </label>
                <label className="admin-order-view-text022">
                  <span>₱‎ {df}</span>
                  <br></br>
                </label>
              </div>
              <div className="admin-order-view-user-name-container2">
                <label className="admin-order-view-text019">
                  <span>Total Amount</span>
                  <br></br>
                </label>
                <label className="admin-order-view-text022">
                  <span>₱‎ {total} </span>
                  <br></br>
                </label>
              </div>
            </div>
          </div>
          <div className="admin-order-view-delivery-address">
            <div className="admin-order-view-background2">
              <h3 className="admin-order-view-title2">Delivery Address</h3>
            </div>
            <span className="admin-order-view-text025">{order.shipTo}</span>
          </div>
          <div className="admin-order-view-user-information">
            <div className="admin-order-view-background3">
              <h3 className="admin-order-view-title3">User Information</h3>
            </div>
            <div className="admin-order-view-basic-info">
              <div className="admin-order-view-user-name-container3">
                <label className="admin-order-view-text026">
                  <span>User Name</span>
                  <br></br>
                </label>
                <label className="admin-order-view-text029">
                  <span>{user.userName}</span>
                  <br></br>
                </label>
              </div>
              <div className="admin-order-view-first-name-container">
                <label className="admin-order-view-text032">
                  <span>First Name</span>
                  <br></br>
                </label>
                <label className="admin-order-view-text035">
                  <span>{user.firstName}</span>
                  <br></br>
                </label>
              </div>
              <div className="admin-order-view-last-name-container">
                <label className="admin-order-view-text038">
                  <span>Last Name</span>
                  <br></br>
                </label>
                <label className="admin-order-view-text041">
                  <span>{user.lastName}</span>
                  <br></br>
                </label>
              </div>
              <div className="admin-order-view-phone-number-container">
                <label className="admin-order-view-text044">
                  <span>Phone Number</span>
                  <br></br>
                </label>
                <label className="admin-order-view-text047">
                  <span>{user.phoneNumber}</span>
                  <br></br>
                </label>
              </div>
              <div className="admin-order-view-email-container">
                <label className="admin-order-view-text050">
                  <span>Email</span>
                  <br></br>
                </label>
                <label className="admin-order-view-text053">{user.email}</label>
              </div>
            </div>
          </div>
          <div className="admin-order-view-user-information">
            <div className="admin-order-view-price">
              <div className="admin-order-view-background4">
                <h3 className="admin-order-view-title4">
                  Logistic Information
                </h3>
              </div>
              <div className="admin-order-view-basic-info1">
                <div className="admin-order-view-user-name-container4">
                  <label className="admin-order-view-text054">
                    <span>Courier Type</span>
                    <br></br>
                  </label>
                  <label className="admin-order-view-text057">
                    <span>JRS</span>
                    <br></br>
                  </label>
                </div>
                <div className="admin-order-view-user-name-container5">
                  <label className="admin-order-view-text060">
                    <span>Date Shipped</span>
                    <br></br>
                  </label>
                  <label className="admin-order-view-text063">
                    <span>2020-03-07</span>
                    <br></br>
                  </label>
                </div>
                <div className="admin-order-view-user-name-container6">
                  <label className="admin-order-view-text066">
                    <span>Date Delivered</span>
                    <br></br>
                  </label>
                  <label className="admin-order-view-text069">
                    <span>2020-03-13</span>
                    <br></br>
                  </label>
                </div>
                <div className="admin-order-view-last-name-container1">
                  <label className="admin-order-view-text072">
                    <span>Delivery Status</span>
                    <br></br>
                  </label>
                  <label className="admin-order-view-text075">
                    <span>Completed</span>
                    <br></br>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="admin-order-view-payment-info">
            <div className="admin-order-view-payment">
              <div className="admin-order-view-background5">
                <h3 className="admin-order-view-title5">Payment Information</h3>
              </div>
              <div className="admin-order-view-basic-info2">
                <div className="admin-order-view-user-name-container7">
                  <label className="admin-order-view-text078">
                    <span>Payment Type</span>
                    <br></br>
                  </label>
                  <label className="admin-order-view-text081">
                    <span>{payment.paymentType}</span>
                    <br></br>
                  </label>
                </div>
                <div className="admin-order-view-first-name-container1">
                  <label className="admin-order-view-text084">
                    <span>Payment Name</span>
                    <br></br>
                  </label>
                  <label className="admin-order-view-text087">
                    <span>{payment.paymentName}</span>
                    <br></br>
                  </label>
                </div>
                <div className="admin-order-view-last-name-container2">
                  <label className="admin-order-view-text090">
                    <span>Amount Paid</span>
                    <br></br>
                  </label>
                  <label className="admin-order-view-text093">
                    <span>₱ {payment.amountPaid}</span>
                    <br></br>
                  </label>
                </div>
                <div className="admin-order-view-phone-number-container1">
                  <label className="admin-order-view-text096">
                    <span>Payment Date</span>
                    <br></br>
                  </label>
                  <label className="admin-order-view-text099">
                    <span>{payment.paymentDate}</span>
                    <br></br>
                  </label>
                </div>
                <div className="admin-order-view-email-container1">
                  <label className="admin-order-view-text102">
                    <span>Payment Status</span>
                    <br></br>
                  </label>
                  <label className="admin-order-view-text105">
                    {payment.paymentStatus}
                  </label>
                </div>
                <div className="admin-order-view-email-container1">
                  <label className="admin-order-view-text102">
                    <span>Reference No.</span>
                    <br></br>
                  </label>
                  <label className="admin-order-view-text105">
                    {payment.referenceNo}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="admin-order-view-container3">
          <button
            name="cancel"
            type="button"
            className="admin-order-view-button button"
            onClick={props.handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderView;
