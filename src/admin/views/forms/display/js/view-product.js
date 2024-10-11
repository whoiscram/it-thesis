import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { baseURL } from "../../../../../config";
import "../../display/css/view-product.css";
import { Table } from "react-bootstrap";
import AdminProductAdd from "../../add/js/add-product";

const AdminProductView = (props) => {
  const { data } = props;
  const [product, setProduct] = useState({});
  const [log, setLog] = useState({});

  useEffect(() => {
    const url = `${baseURL}CRUD.php?viewProduct=${data}`;
    axios
      .get(url)
      .then((response) => {
        setProduct(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error("Error:"));
  }, []);

  useEffect(() => {
    const stockUrl = `${baseURL}getStockLog.php?productID=${data}`;
    axios
      .get(stockUrl)
      .then((response) => {
        console.log(response.data);
        setLog(response.data);
      })
      .catch((error) => console.error("Error:"));
  }, []);

  const listItems = Object.entries(log).map(([key, value]) => (
    <tbody>
      <tr key={key}>
        <td>{value.stock_logID}</td>
        <td>{value.date}</td>
        <td>{value.batchCode}</td>
        <td>{value.quantity}</td>
        <td>{value.description}</td>
      </tr>
    </tbody>
  ));
  return (
    <div className="view-container">
      <Helmet>
        <title>Admin-Product-View - exported project</title>
        <meta
          property="og:title"
          content="Admin-Product-View - exported project"
        />
      </Helmet>
      <div className="view-container1">
        <div className="view-header">
          <h1 className="view-text">PRODUCT DETAILS</h1>
        </div>
        <img alt="image" className="view-image" src={product[0]?.imageSource} />
        <div className="view-product-details-1">
          <div className="view-product-name">
            <div className="view-background">
              <h3 className="view-title">Product Name</h3>
            </div>
            <span className="view-text01">{product[0]?.productName}</span>
          </div>
          <div className="view-product-description">
            <div className="view-background1">
              <h3 className="view-title1">Product Description</h3>
            </div>
            <span className="view-text02">{product[0]?.productDesc}</span>
          </div>
          <div className="view-p-s-s">
            <div className="view-price">
              <div className="view-background2">
                <h3 className="view-title2">Price</h3>
              </div>
              <span className="view-text03">₱ {product[0]?.price}</span>
            </div>
            <div className="view-stock">
              <div className="view-background3">
                <h3 className="view-title3">Stock</h3>
              </div>
              <span className="view-text04">{product[0]?.qtyStock}</span>
            </div>
            <div className="view-s-k-u">
              <div className="view-background4">
                <h3 className="view-title4">SKU</h3>
              </div>
              <span className="view-text05">040000</span>
            </div>
          </div>
          <div className="view-category">
            <div className="view-background5">
              <h3 className="view-title5">Category</h3>
            </div>
            <span className="view-text06">
              {product[0]?.catNme}
              <span
                dangerouslySetInnerHTML={{
                  __html: " ",
                }}
              />
            </span>
          </div>
          <div className="view-attributes">
            <div className="view-attribute-name">
              <div className="view-background6">
                <h3 className="view-title6">Attribute Name</h3>
              </div>
              <span className="view-text07">
                <span className="view-text08">Size</span>
                <br></br>
              </span>
            </div>
            <div className="view-variation">
              <div className="view-background7">
                <h3 className="view-title7">Variation</h3>
              </div>
              <span className="view-text10">
                <span className="view-text11">Small</span>
                <br></br>
                <span>Medium</span>
                <br></br>
                <span>Large</span>
                <br></br>
              </span>
            </div>
          </div>
          <div className="view-category">
            <div className="view-background5">
              <h3 className="view-title5">Inventory Logs</h3>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Stock Log ID</th>
                  <th>Date</th>
                  <th>batchCode</th>
                  <th>Quantity</th>
                  <th>Description</th>
                </tr>
              </thead>
              {listItems}
            </Table>
            <span className="view-text06">
              <span
                dangerouslySetInnerHTML={{
                  __html: " ",
                }}
              />
            </span>
          </div>
        </div>
        <div className="view-container2">
          <button
            name="close"
            type="button"
            className="close-button button"
            onClick={props.handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductView;
