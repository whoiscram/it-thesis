import axios from "axios";
import React, { useState, useEffect } from "react";
import "../../update/css//update-stock.css";
import { baseURL } from "../../../../../config";

const UpdateStock = (props) => {
  const [stock, setStock] = useState("");
  const [product, setProduct] = useState("");
  const [input, setInputs] = useState("");
  useEffect(() => {
    setTimeout(async () => {
      axios
        .get(baseURL + "CRUD.php?products")
        //.get(`http://localhost/it-project-ini/php/CRUD.php?products`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => console.error("Error:"));
    }, 100);
  }, []);

  const listItems = Object.entries(product).map(([key, value]) => (
    <option value={value.productID}>{value.productName}</option>
  ));

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleRestock = (event) => {
    event.preventDefault();
    const qty = {
      quantity: input.quantity,
      productID: input.productID,
    };

    axios
      .post(
        baseURL + "restock.php",
        qty
        // `http://localhost/it-project-ini/php/restock.php`,
        // qty
      )
      .then((response) => {
        console.log(response.data);
        window.alert("Product Succesfully updated");
        return axios.post(
          baseURL + "stock_log.php",
          input
          // `http://localhost/it-project-ini/php/stock_log.php`,
          // input
        );
      })
      .then((response) => {
        console.log(response.data);
        window.alert("Restocked Successfully");
        location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRemove = (event) => {
    event.preventDefault();
    const qty = {
      quantity: input.quantity,
      productID: input.productID,
    };

    axios
      .post(
        baseURL + "removeStock.php",
        qty
        // `http://localhost/it-project-ini/php/removeStock.php`,
        // qty
      )
      .then((response) => {
        console.log(response.data);
        window.alert("Product Succesfully updated");
        return axios.post(
          baseURL + "stock_log.php"
          // `http://localhost/it-project-ini/php/stock_log.php`,
          // input
        );
      })
      .then((response) => {
        console.log(response.data);
        window.alert("Removed Stock Successfully.");
        location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(input);

  return (
    <div className="update-stock-container">
      <div className="update-stock-container1">
        <h1 className="update-stock-text">Update Stock</h1>
        <form className="update-stock-form">
          <div className="update-stock-product-name">
            <label
              id="productName"
              htmlFor="productID"
              className="update-stock-product-name-label"
            >
              <span>Product Name</span>
              <br></br>
            </label>
            <select
              name="productID"
              required
              className="update-stock-select"
              onChange={handleChange}
            >
              <option>Select Product</option>
              {listItems}
            </select>
          </div>
          <div className="update-stock-batch-code">
            <label id="batchCode" htmlFor="firstname">
              <span>Batch Code</span>
              <br></br>
            </label>
            <input
              type="text"
              name="batchCode"
              required
              placeholder="e.g. INI001"
              className="update-stock-batch-code-input input"
              onChange={handleChange}
            />
          </div>
          <div className="update-stock-quantity">
            <label id="quantity" htmlFor="category">
              <span>Quantity</span>
              <br></br>
            </label>
            <input
              type="number"
              name="quantity"
              required
              placeholder="e.g. 10"
              className="update-stock-quantity-input input"
              onChange={handleChange}
            />
          </div>
          <div className="update-stock-date">
            <label id="date" htmlFor="firstname">
              <span>Date </span>
              <br></br>
            </label>
            <input
              type="date"
              name="date"
              required
              placeholder="e.g. +639123456789"
              className="update-stock-date-input input"
              onChange={handleChange}
            />
          </div>
          <div className="update-stock-desicription">
            <label id="description" htmlFor="firstname">
              <span>Description</span>
              <br></br>
            </label>
            <input
              type="text"
              name="description"
              required
              placeholder="Description for replenishing/removing stock"
              className="update-stock-description-input input"
              onChange={handleChange}
            />
          </div>
          <button
            name="cancel"
            type="button"
            className="update-stock-button button"
            onClick={props.handleClose}
          >
            Cancel
          </button>
          <button
            name="addUser"
            type="submit"
            className="update-stock-button1 button"
            onClick={handleRestock}
          >
            <span className="update-stock-text11">
              <span>Restock</span>
              <br></br>
            </span>
          </button>
          <button
            name="addUser"
            type="submit"
            className="update-stock-button2 button"
            onClick={handleRemove}
          >
            <span className="update-stock-text14">
              <span>Remove</span>
              <br></br>
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateStock;
