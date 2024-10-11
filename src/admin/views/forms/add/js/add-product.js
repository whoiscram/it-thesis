import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import "../css/add-product.css";
import Form from "react-bootstrap/Form";
import ImageUploader from "react-images-upload";
import { baseURL } from "../../../../../config";
import { optionGroupUnstyledClasses } from "@mui/base";

const AdminProductAdd = (props) => {
  useEffect(() => {
    //Change url to path of CRUD.php
    //const url = baseURL + "CRUD.php/order";
    axios
      .get(baseURL + "categoryOptions.php")
      // .get("http://localhost/it-project-ini/php/categoryOptions.php")
      .then((response) => response.data)
      .then((data) => {
        const select = document.getElementById("categoryID");
        data.forEach(function (item) {
          const option = document.createElement("option");
          option.value = item.value;
          option.text = item.text;
          select.add(option);
        });
      });

    axios
      .get(baseURL + "sizeOptions.php")
      // .get("http://localhost/it-project-ini/php/sizeOptions.php") // do not yet remove
      .then((response) => response.data)
      .then((data) => {
        setSizeOpt(data);
      });

    axios
      .get(baseURL + "colorOptions.php")
      // .get("http://localhost/it-project-ini/php/colorOptions.php") //do not yet remove
      .then((response) => response.data)
      .then((data) => {
        setColorOpt(data);
      });
  }, []);

  const [inputs, setInputs] = useState({});
  const [sizeOpt, setSizeOpt] = useState([]);
  const [colorOpt, setColorOpt] = useState([]);

  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState(true);

  const [state, setState] = useState({
    pictures: [],
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // Holds Picture
  const onDrop = (picture) => {
    console.log(picture);
    setState({
      pictures:
        state.pictures.concat(picture) /* state.pictures.concat(picture) */,
    });
  };

  function handleFirstSelectChange(event) {
    setCategory(event.target.value);
    setSubCategory(event.target.value !== "1");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const file = document.getElementsByName("imageSource")[0]["files"][0];
    const formData = new FormData();
    formData.append("file", file);
    // Axios request that sends inputs to backend

    axios
      .post(baseURL + "addProduct.php", inputs)
      // .post("http://localhost/it-project-ini/php/addProduct.php", inputs) //dont remove yet
      .then(function (response) {
        console.log(response.data);
        window.alert("Product added.");
        location.reload();
      });

    axios
      .post(baseURL + "uploadImage.php", formData)
      // .post("http://localhost/it-project-ini/php/uploadImage.php", formData) //dont remove yet
      .then(function (response) {
        console.log(response.data);
      });
  };

  return (
    <div className="admin-product-add-container">
      <Helmet>
        <title>Admin-Product-Add - exported project</title>
        <meta
          property="og:title"
          content="Admin-Product-Add - exported project"
        />
      </Helmet>
      <div className="admin-product-add-container01">
        <h1 className="admin-product-add-text">Add New Product</h1>
        <form className="admin-product-add-form" onSubmit={handleSubmit}>
          <div className="admin-product-add-product-name">
            <label htmlFor="productname">
              <span>Product Name</span>
              <br></br>
            </label>
            <input
              type="text"
              id="productname"
              name="productName"
              required
              placeholder="ex: Inabel ni Ina Pouch"
              autoComplete="off"
              onChange={handleChange}
              className="admin-product-add-product-name-input input"
            />
          </div>
          <div className="admin-product-add-product-description">
            <label htmlFor="productdescription">
              <span>Product Description</span>
              <br></br>
            </label>
            <textarea
              id="productdescription"
              name="productDescription"
              placeholder="Describe your product here..."
              className="admin-product-add-product-desc-text-area textarea"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="admin-product-add-container02">
            <div className="admin-product-add-container03">
              <label htmlFor="price">
                <span>Price</span>
                <br></br>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                enctype="₱ Price"
                required
                placeholder="₱ Price"
                className="admin-product-add-price input"
                onChange={handleChange}
              />
            </div>
            <div className="admin-product-add-container04">
              <label htmlFor="stock" className="admin-product-add-stock-label">
                <span>Stock</span>
                <br></br>
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                required
                placeholder="Stock"
                className="admin-product-add-stock input"
                onChange={handleChange}
              />
            </div>
            <div className="admin-product-add-container05">
              <label htmlFor="sku" className="admin-product-add-sku-label">
                <span>SKU</span>
                <br></br>
              </label>
              <input
                type="text"
                id="sku"
                name="sku"
                placeholder="SKU"
                className="admin-product-add-sku input"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="admin-product-add-category">
            <label htmlFor="category">
              <span>Category</span>
              <br></br>
            </label>
            <select
              name="categoryID"
              id="categoryID"
              type="category"
              required
              value={category}
              onChange={handleFirstSelectChange}
              onClick={handleChange}
              className="admin-product-add-category-dropdown"
            ></select>
          </div>
          <div className="admin-product-add-category">
            <label htmlFor="subCategory">
              <span>Sub Category</span>
              <br></br>
            </label>
            <select
              name="sub_categoryID"
              id="sub_categoryID"
              type="subCategory"
              required
              disabled={subCategory}
              onChange={handleChange}
              className="admin-product-add-category-dropdown"
            >
              <option value="2">Men</option>
              <option value="1">Women</option>
              <option value="3">Unisex</option>
            </select>
          </div>
          <div className="admin-product-add-container06">
            <div className="admin-product-add-container07">
              <label
                htmlFor="category"
                className="admin-product-add-attribute-label"
              >
                <span>Attributes</span>
                <br></br>
              </label>
            </div>
            <div className="admin-product-add-container08">
              <div className="admin-product-add-container09">
                <div className="admin-product-add-container10">
                  <span className="admin-product-add-text15">Size</span>
                </div>
                <div className="admin-product-add-container11">
                  {sizeOpt.map((item) => (
                    <div>
                      <Form.Check
                        type="radio"
                        id={item.value}
                        label={item.text}
                        name="attribute_valueID"
                        value={item.value}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="admin-product-add-container12">
                <div className="admin-product-add-container13">
                  <span className="admin-product-add-text17">Color</span>
                </div>
                <div className="admin-product-add-container14">
                  {colorOpt.map((item) => (
                    <div>
                      <Form.Check
                        type="radio"
                        id={item.value}
                        label={item.text}
                        name="attribute_valueID"
                        value={item.value}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="admin-product-add-product-images">
            <label htmlFor="category">
              <div>Product Image</div>
              <br></br>
            </label>
            <div
              className="admin-product-add-image-container"
              onChange={handleChange}
              required
              type="file"
              name="submit"
              id="test"
            >
              <ImageUploader
                withIcon={false}
                withPreview={true}
                name="imageSource"
                type="file"
                id="imageSource"
                onChange={onDrop}
                buttonText="Choose image/s"
                imgExtension={[".jpg", ".gif", ".png"]}
                maxFileSize={5242880}
                singleImage={true}
              />
            </div>
          </div>
          <div className="admin-product-add-container15">
            <div className="admin-product-add-container16">
              <button
                name="cancel"
                type="button"
                className="admin-product-add-button1 button"
                onClick={props.handleClose}
              >
                Cancel
              </button>
            </div>
            <div className="admin-product-add-container17">
              <button
                name="addUser"
                type="submitThis"
                className="admin-product-add-button2 button"
              >
                <span className="admin-product-add-text24">
                  <span>Add Product</span>
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

export default AdminProductAdd;
