import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import phil, { provinces } from "phil-reg-prov-mun-brgy";
import "../../update/css/update-order.css";
import InputSpinner from "react-bootstrap-input-spinner";
import { Table } from "react-bootstrap";
import { unstable_getNormalizedScrollLeft } from "@mui/utils";
import { baseURL } from "../../../../../config";

const AdminOrderUpdate = (props) => {
  const { data } = props; // orderID

  useEffect(() => {
    courierRef.current.value = props.defaultCourierType;
    paymentRef.current.value = props.defaultPaymentType;
    paymentDateRef.current.value = props.defaultPaymentDate;
    amountRef.current.value = props.defaultAmountPaid;
    paymentStatusRef.current.value = props.defaultPaymentStatus;
  }, [
    props.defaultCourierType,
    props.defaultPaymentType,
    props.defaultPaymentDate,
    props.defaultAmountPaid,
    props.defaultPaymentStatus,
    props.defaultOrderStatus,
  ]);
  const [tA, setTA] = useState("");
  useEffect(() => {
    //Total Ammount
    const columnTotal = productData.map((row) =>
      totalA.push(parseInt(row.totalAmount))
    );
    const totalAmount = totalA.reduce((a, b) => a + b, 0);
    setTA(totalAmount);
    //const getOrderDetails = `${baseURL}getOrderDetails.php/orderID=${data}`;
    //const getAllOrders = `${baseURL}getOrderDetails.php/orderID=${data}`;
    const getOrderDetails = `http://localhost/it-project-ini/php/getOrderDetails.php?orderID=${data}`;
    const getAllOrders = `http://localhost/it-project-ini/php/getAllOrders.php?orderID=${data}`;
    // -->
    axios
      .get(getOrderDetails)
      .then((response) => {
        setOrderData(response.data);

        return axios.get(getAllOrders);
      })
      .then((response) => {
        setProductData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [orderData, setOrderData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [orderType, setOrderType] = useState([]);
  const totalA = [];

  // CourierType
  const [courierType, setCourierType] = useState(props.defaultCourierType);
  const courierRef = useRef();
  const handleCourierChange = (event) => {
    setCourierType(event.target.value);
    console.log(event.target.value);
  };
  const [deliveryShipped, setDeliveryShipped] = useState(
    props.defaultDeliveryShipped
  );
  const deliveryShippedRef = useRef();
  const handleDeliveryShipped = (event) => {
    setDeliveryShipped(event.target.value);
    console.log(event.target.value);
  };

  const [dateDelivered, setDateDelivered] = useState(
    props.defaultDateDelivered
  );
  const dateDeliveredRef = useRef();
  const handleDateDelivered = (event) => {
    setDateDelivered(event.target.value);
    console.log(event.target.value);
  };
  // -->

  //Order Status
  const [orderStatus, setOrderSatatus] = useState(props.defaultOrderStatus);
  const orderStatusRef = useRef();

  const handleOrderStatus = (event) => {
    setOrderSatatus(event.target.value);
    console.log(event.target.value);
  };

  //Payment Type

  const [paymentType, setPaymentType] = useState(props.defaultPaymentType);
  const paymentRef = useRef();

  const handlePaymentChange = (event) => {
    setPaymentType(event.target.value);
    console.log(event.target.value);
  };

  const [paymentDate, setPaymentDate] = useState(props.defaultPaymentDate);
  const paymentDateRef = useRef();
  const handlePaymentDateChange = (event) => {
    setPaymentDate(event.target.value);
    console.log(event.target.value);
  };

  const [amountPaid, setAmountPaid] = useState(props.defaultAmountPaid);
  const amountRef = useRef();
  const handleAmountPaidChange = (event) => {
    setAmountPaid(event.target.value);
    console.log(event.target.value);
  };

  const [paymentStatus, setPaymentStatus] = useState(
    props.defaultPaymentStatus
  );
  const paymentStatusRef = useRef();
  const handlePaymentStatusChange = (event) => {
    setPaymentStatus(event.target.value);
    console.log(event.target.value);
  };

  const [paymentName, setPaymentName] = useState(props.defaultPaymentName);
  const paymentNameRef = useRef();
  const handlePaymentName = (event) => {
    setPaymentName(event.target.value);
    console.log(event.target.value);
  };

  // Direct Bank Transfer
  let type = [];
  const directBank = [
    {
      value: "BDO",
      label: "BDO",
    },
    {
      value: "LandBank",
      label: "LandBank",
    },
  ];

  const digital = [
    {
      value: "Gcash",
      label: "Gcash",
    },
  ];

  if (props.defaultPaymentType === "Direct Bank Transfer") {
    type = directBank;
  } else if (props.defaultPaymentType === "Digital Wallet") {
    type = digital;
  }
  // -->>

  const [deliveryStatus, setDeliveryStatus] = useState(
    props.defaultDeliveryStatus
  );
  const deliveryRef = useRef();
  const handleDeliveryChange = (event) => {
    setDeliveryStatus(event.target.value);
    console.log(event.target.value);
  };

  //renders Customized Div
  const [render, setRender] = useState(false);

  //render this Constant depending on value (OrderType)
  const Customized = () => {
    return (
      <div className="admin-order-add-measurement-container">
        <div className="admin-order-add-container05">
          <span className="admin-order-add-text08">Measurement</span>
        </div>
        <div className="admin-order-add-fpt-container">
          <div className="admin-order-add-customize-container1">
            <div className="admin-order-add-container06">
              <span className="admin-order-add-text09">Bust</span>
              <input
                type="number"
                id="bust"
                name="bust"
                required
                autoComplete="off"
                className="admin-order-add-product-name-input01 input"
              />
            </div>
            <div className="admin-order-add-container07">
              <span className="admin-order-add-text10">Waist</span>
              <input
                type="number"
                id="waist"
                name="waist"
                required
                autoComplete="off"
                className="admin-order-add-product-name-input02 input"
              />
            </div>
            <div className="admin-order-add-container08">
              <span className="admin-order-add-text11">Back Width</span>
              <input
                type="number"
                id="backWidth"
                name="backWidth"
                required
                autoComplete="off"
                className="admin-order-add-product-name-input03 input"
              />
            </div>
            <div className="admin-order-add-container09">
              <span className="admin-order-add-text12">Front Chest</span>
              <input
                type="number"
                id="frontChest"
                name="frontChest"
                required
                autoComplete="off"
                className="admin-order-add-product-name-input04 input"
              />
            </div>
          </div>
          <div className="admin-order-add-customize-container2">
            <div className="admin-order-add-container10">
              <span className="admin-order-add-text13">Shoulder</span>
              <input
                type="number"
                id="shoulder"
                name="shoulder"
                required
                autoComplete="off"
                className="admin-order-add-product-name-input05 input"
              />
            </div>
            <div className="admin-order-add-container11">
              <span className="admin-order-add-text14">Under Bust</span>
              <input
                type="number"
                id="underBust"
                name="underBust"
                required
                autoComplete="off"
                className="admin-order-add-product-name-input06 input"
              />
            </div>
            <div className="admin-order-add-container12">
              <span className="admin-order-add-text15">Upper Arm</span>
              <input
                type="number"
                id="upperArm"
                name="upperArm"
                required
                autoComplete="off"
                className="admin-order-add-product-name-input07 input"
              />
            </div>
            <div className="admin-order-add-container13">
              <span className="admin-order-add-text16">Shoulder to Waist</span>
              <input
                type="number"
                id="stw"
                name="stw"
                required
                autoComplete="off"
                className="admin-order-add-product-name-input08 input"
              />
            </div>
          </div>
        </div>
        <div className="admin-order-add-skirt-container">
          <div className="admin-order-add-customize-container3">
            <div className="admin-order-add-container14">
              <span className="admin-order-add-text17">Waist</span>
              <input
                type="number"
                id="waistt"
                name="waist"
                required
                autoComplete="off"
                className="admin-order-add-product-name-input09 input"
              />
            </div>
            <div className="admin-order-add-container15">
              <span className="admin-order-add-text18">Hips</span>
              <input
                type="text"
                id="shoulder"
                name="productName"
                required
                autoComplete="off"
                className="admin-order-add-product-name-input10 input"
              />
            </div>
            <div className="admin-order-add-container16">
              <span className="admin-order-add-text19">Skirt Length</span>
              <input
                type="text"
                id="skirtLength"
                name="skirtLentgth"
                required
                placeholder="ex: Inabel ni Ina Pouch"
                autoComplete="off"
                className="admin-order-add-product-name-input11 input"
              />
            </div>
          </div>
        </div>
        <div className="admin-order-add-size-container">
          <span className="admin-order-add-text20">Size</span>
          <select
            id="attribute"
            type="attribute"
            required
            className="admin-order-add-category-dropdown1"
          >
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
          </select>
        </div>
        <div className="admin-order-add-container17">
          <button type="button" className="admin-order-add-button1 button">
            <span className="admin-order-add-text21">
              <span>Save</span>
              <br></br>
            </span>
          </button>
        </div>
      </div>
    );
  };

  function handleOrderType(data) {
    if (data.target.value === "customized") {
      setRender(true);
    } else if (data.target.value === "pre-made") {
      setRender(false);
    }
    return setOrderType(data.target.value);
  }

  AdminOrderUpdate.defaultProps = {
    defaultCourierType: orderData.courierType,
    defaultDeliveryStatus: orderData.deliveryStatus,
    defaultDeliveryShipped: orderData.dateShipped,
    defaultDateDelivered: orderData.dateDelivered,
    defaultPaymentType: orderData.paymentType,
    defaultPaymentDate: orderData.paymentDate,
    defaultAmountPaid: orderData.amountPaid,
    defaultPaymentStatus: orderData.paymentStatus,
    defaultPaymentName: orderData.paymentName,
  };
  function updateOrder(event) {
    event.preventDefault();
    const formData = {
      orderID: orderData.orderID,
      amountPaid: amountRef.current.value,
      paymentType: paymentRef.current.value,
      paymentName: paymentNameRef.current.value,
      paymentDate: paymentDateRef.current.value,
      paymentStatus: paymentStatusRef.current.value,
      paymentID: orderData.paymentID,
      userID: orderData.userID,
      deliveryID: orderData.deliveryID,
      dateShipped: deliveryShippedRef.current.value,
      dateDelivered: dateDeliveredRef.current.value,
      courierType: courierRef.current.value,
      deliveryStatus: deliveryRef.current.value,
      orderStatus: orderStatusRef.current.value,
    };

    axios
      //.post(baseURL + "updatePayment.php", formData)
      .post("http://localhost/it-project-ini/php/updatePayment.php", formData) //dont remove yet
      .then(function (response) {
        console.log(response.data);
        window.prompt("Order Updated");
        location.reload();
      });
  }

  const listItems = Object.entries(productData).map(([key, value]) => (
    <tbody>
      <tr key={key}>
        <td>{value.productName}</td>
        <td>{value.quantity}</td>
        <td>₱ {value.totalAmount}</td>
      </tr>
    </tbody>
  ));

  return (
    <div className="order-update-container">
      <Helmet>
        <title>Order-Update - exported project</title>
        <meta property="og:title" content="Order-Update - exported project" />
      </Helmet>
      <div className="order-update-container01">
        <h1 className="order-update-text">Add New Order</h1>
        <form className="order-update-form" onSubmit={updateOrder}>
          <div className="order-update-order-container">
            <label
              htmlFor="productdescription"
              className="order-update-order-label"
            >
              <span>Order</span>
              <br></br>
            </label>
            <div className="order-update-type-stat-container">
              <div className="order-update-order-type-container">
                <select
                  className="order-update-courier-drop-down"
                  onChange={handleOrderStatus}
                  ref={orderStatusRef}
                  defaultValue={orderStatus}
                >
                  <option value="Pending">Pending</option>
                  <option value="Complete">Complete</option>
                </select>
              </div>
            </div>
            <div className="order-update-type-stat-container">
              <div className="order-update-order-type-container">
                <span>Order Type</span>
                <select
                  id="orderType"
                  required
                  value={orderType}
                  onChange={handleOrderType}
                  className="admin-order-add-type-dropdown"
                  name="orderType"
                  disabled
                >
                  <option value="pre-made">Premade</option>
                  <option value="customized">Customized</option>
                </select>
              </div>
            </div>
            {render ? <Customized /> : null}
            <div className="order-update-order-list-container">
              <div className="order-update-details">
                <div className="order-update-order-breakdown-container">
                  <label className="order-update-text24">
                    <span>Order Breakdown</span>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Product Name</th>
                          <th>Quanity</th>
                          <th>Total Amount</th>
                        </tr>
                      </thead>
                      {listItems}
                    </Table>
                  </label>
                </div>
                <div className="order-update-user-name-container1">
                  <label className="order-update-text30">
                    <span>Total Amount</span>

                    <br></br>
                  </label>
                  <label className="order-update-text33">
                    {/* <span>₱‎ 170</span> */}
                    <b>₱ {tA}</b>
                    <br></br>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="order-update-billing-shipping-container">
            <div className="order-update-container18">
              <label
                htmlFor="productdescription"
                className="order-update-billing-label"
              >
                <span>Billing and Shipping Information</span>
                <br></br>
              </label>
            </div>
            <div className="order-update-customer-name-container">
              <label htmlFor="productname">
                <b>Customer Name: </b>
                <span>{orderData.customerName}</span>
                <br></br>
              </label>
            </div>
          </div>
          <div className="order-update-product-description">
            <label htmlFor="productdescription">
              <b>Delivery Address</b>
              <br></br>
            </label>
            <div className="order-update-container19">
              <div className="order-update-container20">
                <label htmlFor="price">
                  <span>{orderData.shipTo}</span>
                  <br></br>
                </label>
              </div>
            </div>
          </div>
          <div className="order-update-delivery-info-container">
            <label
              htmlFor="productdescription"
              className="order-update-del-info-label"
            >
              <span> Delivery Information</span>
              <br></br>
            </label>
            <div className="order-update-container29">
              <div className="order-update-container30">
                <label htmlFor="category">
                  <span>Courier Type</span>
                  <br></br>
                </label>
                <select
                  className="order-update-courier-drop-down"
                  onChange={handleCourierChange}
                  ref={courierRef}
                  defaultValue={courierType}
                >
                  <option value="JRS">JRS</option>
                  <option value="J&T">J&T</option>
                </select>
              </div>
              <div className="order-update-date-shipper-container">
                <label htmlFor="category">
                  <span>Date Shipped</span>
                  <br></br>
                </label>
                <input
                  type="date"
                  name="dateShipped"
                  value={deliveryShipped}
                  onChange={handleDeliveryShipped}
                  ref={deliveryShippedRef}
                  defaultValue={props.defaultDeliveryShipped}
                  className="order-update-amount-paid input"
                />
              </div>
              <div className="order-update-date-delivered-container">
                <label htmlFor="category">
                  <span>Date Delivered</span>
                  <br></br>
                </label>
                <input
                  type="date"
                  name="dateDelivered"
                  value={dateDelivered}
                  onChange={handleDateDelivered}
                  ref={dateDeliveredRef}
                  defaultValue={props.defaultDateDelivered}
                  className="order-update-amount-paid1 input"
                />
              </div>
            </div>
            <div className="order-update-delivery-stat-container">
              <label htmlFor="category">
                <span>Delivery Status</span>
                <br></br>
              </label>
              <select
                id="category"
                type="category"
                required
                onChange={handleDeliveryChange}
                ref={deliveryRef}
                defaultValue={deliveryStatus}
                className="order-update-del-stat-dropdown"
              >
                <option value="delivered">delivered</option>
                <option value="in-transit">in-transit</option>
                <option value="preparing">preparing</option>
              </select>
            </div>
          </div>
          <div className="order-update-payment-info-container">
            <label
              htmlFor="productdescription"
              className="order-update-payment-info-label"
            >
              <span> Payment Information</span>
              <br></br>
            </label>
            <div className="order-update-container31">
              <div className="order-update-container32">
                <label htmlFor="category">
                  <span>Payment Type</span>
                  <br></br>
                </label>
                <select
                  id="category"
                  type="category"
                  onChange={handlePaymentChange}
                  ref={paymentRef}
                  defaultValue={paymentType}
                  required
                  className="order-update-payment-type-dropdown"
                >
                  <option value="Direct Bank Transfer">
                    Direct Bank Transfer
                  </option>
                  <option value="Digital Wallet">Digital Wallet</option>
                </select>
              </div>
              <div className="order-update-container33">
                <label htmlFor="category">
                  <span>Payment Name</span>
                  <br></br>
                </label>

                <select
                  className="order-update-radiobutton"
                  name="PaymentName"
                  onChange={handlePaymentName}
                  ref={paymentNameRef}
                  defaultValue={paymentName}
                >
                  {type.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="order-update-container34">
              <div className="order-update-container35">
                <label htmlFor="category">
                  <span>Amount Paid</span>
                  <br></br>
                </label>
                <input
                  type="number"
                  value={amountPaid}
                  ref={amountRef}
                  onChange={handleAmountPaidChange}
                  defaultValue={props.defaultAmountPaid}
                  name="price"
                  enctype="₱ Price"
                  required
                  className="order-update-amount-paid2 input"
                />
              </div>
              <div className="order-update-payment-date-container">
                <label htmlFor="category">
                  <span>Payment Date</span>
                  <br></br>
                </label>
                <input
                  type="date"
                  name="paymentDate"
                  value={paymentDate}
                  onChange={handlePaymentDateChange}
                  required
                  ref={paymentDateRef}
                  defaultValue={props.defaultPaymentDate}
                  placeholder="2022-11-09"
                  className="order-update-amount-paid3 input"
                />
              </div>
              <div className="order-update-container36">
                <label htmlFor="category">
                  <span>Payment Status</span>
                  <br></br>
                </label>
                <select
                  name="Payment Status"
                  ref={paymentStatusRef}
                  onChange={handlePaymentStatusChange}
                  defaultValue={paymentStatus}
                  required
                  className="order-update-payment-status-dropdown"
                >
                  <option value="paid">Paid</option>
                  <option value="partially paid">Partially Paid</option>
                </select>
              </div>
            </div>
          </div>
          <div className="order-update-receipt-container">
            <label htmlFor="category">
              <span>Receipt</span>
              <br></br>
            </label>
            <div className="order-update-image-container">
              <button type="button" className="order-update-button2 button">
                <span className="order-update-text80">
                  <span>Update Receipt</span>
                  <br></br>
                </span>
              </button>
            </div>
          </div>
          <div className="order-update-container37">
            <div className="order-update-container38">
              <button
                name="cancel"
                type="button"
                className="order-update-button3 button"
                onClick={props.handleClose}
              >
                Cancel
              </button>
            </div>
            <div className="order-update-container39">
              <button
                name="addUser"
                type="submit"
                className="order-update-button4 button"
              >
                <span className="order-update-text83">
                  <span>Update Order</span>
                  <br></br>
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminOrderUpdate;
