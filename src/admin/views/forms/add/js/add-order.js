import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import InputSpinner from "react-bootstrap-input-spinner";
import Table from "react-bootstrap/Table";
import "../../add/css/add-order.css";
import phil, { provinces } from "phil-reg-prov-mun-brgy";
import { baseURL } from "../../../../../config";
const AdminOrderAdd = (props) => {
  const [productList, setProduct] = useState([]);
  //handle Select Options product
  const [selected, setSelected] = useState([]);
  //handle Select Options user
  const [selectedUser, setSelectedUser] = useState([]);
  //handle Inputs
  const [inputs, setInputs] = useState([]);
  // quantity
  const [qty, setQty] = useState([]);
  // get ProductName by selection (selected)
  const [view, setView] = useState([]);
  // user selected by userID
  const [user, setUser] = useState([]);
  // get payment type
  const [payment, setPayment] = useState([]);
  //TO BE REMOVED since static
  const [deliveryType, setDeliveryType] = useState();
  // TO BE REMOVED since static
  const [orderType, setOrderType] = useState([]);
  // set paymentName
  const [paymentName, setPaymentName] = useState([]);
  //renders Customized Div
  const [render, setRender] = useState(false);
  //renders OrderBreakdown
  const [renderBreakdown, setRenderBreakdown] = useState(false);
  // render input depending what value payment types / payment Types / bank transfer
  const [renderBankT, setRenderBankT] = useState(false);
  // render input depending what value payment types / payment Types / e wallet
  const [renderEwall, setRenderEwall] = useState(false);
  //get Region List from import phil.regions
  const regionList = phil.regions;
  // set state of region
  const [region, setRegion] = useState();
  // set state of province
  const [province, setProvince] = useState();
  // set state for city
  const [city, setCity] = useState();
  // set state for Barangay
  const [barangay, setBarangay] = useState();
  // get provincesByRegion
  const provinces = phil?.getProvincesByRegion(region?.[0]);
  //get cities by region
  const cities = phil.getCityMunByProvince(province?.[0]);
  //get barnagay by region
  const brgy = phil.getBarangayByMun(city?.[0]);
  const deliveryTypes = ["J&T", "JRS"];
  const paymentTypes = ["Direct Bank Transfer", "Digital Wallet"];
  //filipiniana/puff blouse/topper/pencil skirt
  const customized = ["Filipiniana", "Puff Blouse", "Topper", "Pencil Skirt"];

  useEffect(() => {
    setTimeout(async () => {
      axios
        .get(baseURL + "CRUD.php?products")
        //.get(`http://localhost/it-project-ini/php/CRUD.php?products`)
        .then((response) => {
          setProduct(response.data);
          console.log(response.data);
        })
        .catch((error) => console.error("Error:"));
    }, 100);
    axios //fetch user
      .get(baseURL + "CRUD.php?user")
      //.get(`http://localhost/it-project-ini/php/CRUD.php?user`)
      .then((response) => {
        setUser(response.data);
        //console.log(response.data);
      });
  }, []);

  // CALCULATIONs
  const subTotal = qty * view[0]?.price;
  //total Amount
  const tAmount = subTotal + 130.0;

  const submitOrder = (event) => {
    event.preventDefault();
    setRenderBreakdown(true);
    axios
      .get(`${baseURL}CRUD.php?viewProduct=${selected}`)
      // .get(
      //   `http://localhost/it-project-ini/php/CRUD.php?viewProduct=${selected}`
      // )
      .then((response) => {
        setView(response.data);
        console.log(response.data);
      });
  };

  // const array = {
  //   inputs,
  //   region,
  //   selectedUser,
  //   province,
  //   city,
  //   barangay,
  //   selected,
  //   orderType,
  //   deliveryType,
  //   payment,
  //   paymentName,
  // };
  const addOrder = (event) => {
    event.preventDefault();

    const formData = {
      region: region,
      userID: selectedUser,
      province: province,
      city: city,
      barangay: barangay,
      produdctID: selected,
      orderType: orderType,
      deliveryType: deliveryType,
      payment: payment,
      paymentName: paymentName,
      pCode: inputs.pCode,
      street: inputs.street,
      houseNo: inputs.houseNumber,
      totalAmount: tAmount,
    };
    axios
      .post(baseURL + "addOrder.php", formData)
      //.post(`http://localhost/it-project-ini/php/addOrder.php`, formData)
      .then((response) => {
        setView(response.data);
      });
  };

  //handles Selected Options (dropdown) // producyt
  function handleSelect(data) {
    return setSelected(data.target.value);
  }

  function handleUser(data) {
    return setSelectedUser(data.target.value);
  }

  function handleChange(event) {
    setQty(event);
  }

  function handleDeliveryType(data) {
    setDeliveryType(data.target.value);
    console.log(data.target.value);
  }

  function handlePaymentType(data) {
    console.log(data.target.value);
    if (data.target.value === "Direct Bank Transfer") {
      setRenderBankT(true);
      setRenderEwall(false);
    } else if (data.target.value === "Digital Wallet") {
      setRenderEwall(true);
      setRenderBankT(false);
    }

    return setPayment(data.target.value);
  }

  function handleOrderType(data) {
    if (data.target.value === "customized") {
      setRender(true);
    } else if (data.target.value === "pre-made") {
      setRender(false);
    }
    return setOrderType(data.target.value);
  }

  function paymen_name(event) {
    return setPaymentName(event.target.value);
  }

  //handles Delivery Options
  function handleRegion(data) {
    const split = data.target.value;
    setRegion(split.split(","));
  }

  //handles Province List
  const handleProvince = (data) => {
    const split = data.target.value;
    return setProvince(split.split(","));
  };

  //handles City
  function handleCity(data) {
    const split = data.target.value;
    return setCity(split.split(","));
  }

  //handles Barangay
  function handleBarangay(data) {
    return setBarangay(data.target.value);
  }

  const handleChangeA = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // list Product List
  const listItems = Object.entries(productList).map(([key, value]) => (
    <option value={value.productID}>{value.productName}</option>
  ));
  // list Users
  const listUser = Object.entries(user).map(([key, value]) => (
    <option value={value.userID}>{value.firstName}</option>
  ));
  // list Region
  const listRegion = Object.entries(regionList).map(([key, value]) => (
    <option value={value.reg_code + "," + value.name}>{value.name}</option>
  ));
  //list Province
  const listProvince = Object.entries(provinces).map(([key, value]) => (
    <option value={value.prov_code + "," + value.name}>{value.name}</option>
  ));
  //list cities
  const listCities = Object.entries(cities).map(([key, value]) => (
    <option value={value.mun_code + "," + value.name}>{value.name}</option>
  ));
  const listBarangay = Object.entries(brgy).map(([key, value]) => (
    <option value={value.name}>{value.name}</option>
  ));

  //render if customized
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

  //render if product is added
  const ProductBreakdown = () => {
    return (
      <div className="admin-order-add-order-breakdown-container">
        <label className="admin-order-add-text24">
          <span>Order Breakdown</span>
          <Table hover className="admin-order-view-text07">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Quanity</th>
                <th>Price</th>
                <th>Sub Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{view[0]?.productID}</td>
                <td>{view[0]?.productName}</td>
                <td>{qty}</td>
                <td>₱‎ {view[0]?.price}</td>
                <td>₱‎ {subTotal}</td>
              </tr>
            </tbody>
          </Table>
          <br></br>
        </label>
      </div>
    );
  };

  //render if bank transfer
  const DirectBankTransfer = () => {
    return (
      <div onChange={paymen_name}>
        <input type="radio" value="BDO" name="bankt" />
        BDO
        <input type="radio" value="Unionbank" name="bankt" />
        UNION BANK
        <input type="radio" value="BPI" name="bankt" />
        BPI
      </div>
    );
  };

  //render if digital wallet
  const DigtalWallet = () => {
    return (
      <div onChange={paymen_name}>
        <input type="radio" value="Gcash" name="Gcash" />
        GCASH
      </div>
    );
  };

  return (
    <div className="admin-order-add-container">
      <Helmet>
        <title>Admin-Order-Add - exported project</title>
        <meta
          property="og:title"
          content="Admin-Order-Add - exported project"
        />
      </Helmet>
      <div className="admin-order-add-container01">
        <h1 className="admin-order-add-text">Add New Order</h1>
        <form className="admin-order-add-form" onSubmit={addOrder}>
          <div className="admin-order-add-order-container">
            <label
              htmlFor="productdescription"
              className="admin-order-add-order-label"
            >
              <span id="hideValuesOnSelect">Order</span>
              <br></br>
            </label>
            <div className="admin-order-add-type-stat-container">
              <div className="admin-order-add-order-type-container">
                <span>Order Type</span>
                <select
                  id="orderType"
                  required
                  value={orderType}
                  onChange={handleOrderType}
                  className="admin-order-add-type-dropdown"
                  name="orderType"
                >
                  <option value="pre-made">Premade</option>
                  <option value="customized">Customized</option>
                </select>
              </div>
            </div>
            {render ? <Customized /> : null}
            <div className="admin-order-add-premade-container">
              <div className="admin-order-add-container02">
                <span>Product</span>
                <select
                  id="productID"
                  name="productID"
                  onChange={handleSelect}
                  value={selected}
                  type="attribute"
                  required
                  className="admin-order-add-category-dropdown"
                >
                  {/* <option value="Option 1">Option 1</option>
                  <option value="Option 2">Option 2</option>
                  <option value="Option 3">Option 3</option> */}
                  <option></option>
                  {listItems}
                </select>
              </div>
              <div className="admin-order-add-container03">
                <span>Quantity</span>
                <InputSpinner
                  id="quantity"
                  name="quantity"
                  required
                  value="1"
                  autoComplete="off"
                  className="admin-order-add-product-name-input input"
                  type={"real"}
                  precision={2}
                  min={0}
                  step={1}
                  onChange={handleChange}
                  variant={"dark"}
                />
              </div>
              <div className="admin-order-add-container04">
                <button
                  type="button"
                  className="admin-order-add-button button"
                  onClick={submitOrder}
                >
                  <span className="admin-order-add-text05">
                    <span>Add</span>
                    <br></br>
                  </span>
                </button>
              </div>
            </div>
            <div className="admin-order-add-order-list-container">
              <div className="admin-order-add-details">
                {/* <div className="admin-order-add-order-breakdown-container">
                  <label className="admin-order-add-text24">
                    <span>Order Breakdown</span>
                    
                    <br></br>
                  </label>
                </div> */}

                {renderBreakdown ? <ProductBreakdown /> : null}
                <div className="admin-order-add-user-name-container">
                  <label className="admin-order-add-text27">
                    <span>Delivery Fee</span>
                    <br></br>
                  </label>
                  <label className="admin-order-add-text30">
                    <span>₱‎ 90</span>
                    <br></br>
                  </label>
                </div>
                <div className="admin-order-add-user-name-container1">
                  <label className="admin-order-add-text33">
                    <span>Total Amount</span>
                    <br></br>
                  </label>
                  <label className="admin-order-add-text30">
                    <span>₱‎ {tAmount}</span>
                    <br></br>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="admin-order-add-billing-shipping-container">
            <div className="admin-order-add-container18">
              <label
                htmlFor="productdescription"
                className="admin-order-add-order-label1"
              >
                <span>Billing and Shipping Information</span>
                <br></br>
              </label>
            </div>
            <div className="admin-order-add-customer-name-container">
              <label htmlFor="productname">
                <span>Customer Name</span>
                <br></br>
              </label>
              <select
                className="admin-order-add-customer-select"
                id="customerName"
                name="customerName"
                value={selectedUser}
                onChange={handleUser}
              >
                {listUser}
              </select>
            </div>
          </div>
          <div className="admin-order-add-product-description">
            <label htmlFor="productdescription">
              <span>Delivery Address</span>
              <br></br>
            </label>
            <div className="admin-order-add-container19">
              <div className="admin-order-add-container20">
                <label htmlFor="price">
                  <span>Region</span>
                  <br></br>
                </label>
                <select
                  className="admin-order-add-select"
                  name="region"
                  value={region}
                  // onChange={addObjectToAddress}
                  // onChange={handleRegion}
                  onChange={handleRegion}
                >
                  {listRegion}
                </select>
              </div>
            </div>
            <div className="admin-order-add-container21">
              <div className="admin-order-add-container22">
                <label
                  htmlFor="stock"
                  className="admin-order-add-province-label"
                >
                  <span>Province</span>
                  <br></br>
                </label>
                <select
                  className="admin-order-add-select1"
                  name="province"
                  onChange={handleProvince}
                  value={province}
                >
                  {listProvince}
                </select>
              </div>
              <div className="admin-order-add-container23">
                <label htmlFor="price">
                  <span>City</span>
                  <br></br>
                </label>
                <select
                  className="admin-order-add-select2"
                  name="city"
                  value={city}
                  onChange={handleCity}
                >
                  {listCities}
                </select>
              </div>
              <div className="admin-order-add-container24">
                <label htmlFor="stock" className="admin-order-add-postal-label">
                  <span>Postal Code</span>
                  <br></br>
                </label>
                <input
                  type="number"
                  name="pCode"
                  required
                  placeholder="1800"
                  className="admin-order-add-postal-input input"
                  onChange={handleChangeA}
                />
              </div>
            </div>
            <div className="admin-order-add-container25">
              <div className="admin-order-add-container26">
                <label htmlFor="sku" className="admin-order-add-sku-label">
                  <span>Barangay</span>
                  <br></br>
                </label>
                <select
                  className="admin-order-add-select3"
                  name="barangay"
                  onChange={handleBarangay}
                  value={barangay}
                >
                  {listBarangay}
                </select>
              </div>
              <div className="admin-order-add-container27">
                <label htmlFor="price">
                  <span>Street</span>
                  <br></br>
                </label>
                <input
                  type="text"
                  id="street"
                  name="street" // ₱ Price
                  //enctype="₱ Price"
                  required
                  placeholder="Quirino Highway"
                  className="admin-order-add-price input"
                  onChange={handleChangeA}
                />
              </div>
              <div className="admin-order-add-container28">
                <label htmlFor="stock" className="admin-order-add-stock-label">
                  <span>House No.</span>
                  <br></br>
                </label>
                <input
                  type="number"
                  id="houseNumber"
                  name="houseNumber"
                  required
                  placeholder="362"
                  className="admin-order-add-stock input"
                  onChange={handleChangeA}
                />
              </div>
            </div>
          </div>
          <div className="admin-order-add-category">
            <label htmlFor="category">
              <span>Delivery Type</span>
              <br></br>
            </label>
            <select
              id="deliveryType"
              type="category"
              required
              className="admin-order-add-category-dropdown2"
              name="deliveryType"
              onChange={handleDeliveryType}
              value={deliveryType}
            >
              {deliveryTypes.map((value) => (
                <option value={value} key={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="admin-order-add-category1">
            <label htmlFor="category">
              <span>Payment Type</span>
              <br></br>
            </label>
            <select
              id="paymentType"
              type="category"
              required
              className="admin-order-add-category-dropdown3"
              name="paymentType"
              onChange={handlePaymentType}
              value={payment}
            >
              {paymentTypes.map((value) => (
                <option value={value} key={value}>
                  {value}
                </option>
              ))}
            </select>
            {renderBankT ? <DirectBankTransfer /> : null}
            {renderEwall ? <DigtalWallet /> : null}
          </div>
          <div className="admin-order-add-product-images">
            <label htmlFor="category">
              <span>Receipt</span>
              <br></br>
            </label>
            <div className="admin-order-add-image-container">
              <button type="button" className="admin-order-add-button2 button">
                <span className="admin-order-add-text62">
                  <span>Upload Image</span>
                  <br></br>
                </span>
              </button>
            </div>
          </div>
          <div className="admin-order-add-container29">
            <div className="admin-order-add-container30">
              <button
                name="cancel"
                type="button"
                className="admin-order-add-button3 button"
                onClick={props.handleClose}
              >
                Cancel
              </button>
            </div>
            <div className="admin-order-add-container31">
              <button
                name="addUser"
                type="submit"
                className="admin-order-add-button4 button"
              >
                <span className="admin-order-add-text65">
                  <span>Add Order</span>
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

export default AdminOrderAdd;
