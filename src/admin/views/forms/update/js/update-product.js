import { Helmet } from "react-helmet";
import "../../update/css/update-product.css";
import React, { useEffect, useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import ImageUploader from "react-images-upload";
import { baseURL } from "../../../../../config";

const AdminProductAdd = (props) => {
  const { data } = props; // productID

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

    //Get Size Options
    axios
      .get(baseURL + "sizeOptions.php")
      // .get("http://localhost/it-project-ini/php/sizeOptions.php") // do not yet remove
      .then((response) => response.data)
      .then((data) => {
        setSizeOpt(data);
      });

    //Get Color Options
    axios
      .get(baseURL + "colorOptions.php")
      // .get("http://localhost/it-project-ini/php/colorOptions.php") //do not yet remove
      .then((response) => response.data)
      .then((data) => {
        setColorOpt(data);
      });

    // Get Product by ProductID
    axios
      .get(baseURL + `CRUD.php?viewProduct=${data}`)
      //.get(`http://localhost/it-project-ini/php/CRUD.php?viewProduct=${data}`) //do not yet remove
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setProductData(data);
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

  const [poductData, setProductData] = useState("");
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  function handleFirstSelectChange(event) {
    setCategory(event.target.value);
    setSubCategory(event.target.value !== "1");
  }

  // Holds Picture
  const onDrop = (picture) => {
    console.log(picture);
    setState({
      pictures:
        state.pictures.concat(picture) /* state.pictures.concat(picture) */,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const file = document.getElementsByName("imageSource")[0]["files"][0];
    const formData = new FormData();
    formData.append("file", file);
    // Axios request that sends inputs to backend

    axios
      .post(baseURL + `updateProduct.php?productID=${data}`, inputs)
      // .post(
      //   `http://localhost/it-project-ini/php/updateProduct.php?productID=${data}`,
      //   inputs
      // ) //dont remove yet
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

  console.log(inputs);

  return (
    <div className="update-container">
      <Helmet>
        <title>update - exported project</title>
        <meta property="og:title" content="update - exported project" />
      </Helmet>
      <div className="update-container01">
        <h1 className="update-text">Update Product</h1>
        <form className="update-form" onSubmit={handleSubmit}>
          <div className="update-product-name">
            <label htmlFor="productname">
              <span>Product Name</span>
              <br></br>
            </label>
            <input
              type="text"
              id="productname"
              name="productName"
              required
              defaultValue={poductData[0]?.productName}
              autoComplete="off"
              onChange={handleChange}
              className="update-product-name-input input"
            />
          </div>
          <div className="update-product-description">
            <label htmlFor="productdescription">
              <span>Product Description</span>
              <br></br>
            </label>
            <textarea
              id="productdescription"
              name="productDescription"
              defaultValue={poductData[0]?.productDesc}
              className="update-product-desc-text-area textarea"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="update-container02">
            <div className="update-container03">
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
                defaultValue={poductData[0]?.price}
                className="update-price input"
                onChange={handleChange}
              />
            </div>
            <div className="update-container04">
              <label htmlFor="stock" className="update-stock-label">
                <span>Stock</span>
                <br></br>
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                required
                placeholder="Stock"
                defaultValue={poductData[0]?.qtyStock}
                className="update-stock input"
                onChange={handleChange}
              />
            </div>
            <div className="update-container05">
              <label htmlFor="sku" className="update-sku-label">
                <span>SKU</span>
                <br></br>
              </label>
              <input
                type="text"
                id="sku"
                name="sku"
                placeholder="SKU"
                defaultValue={poductData[0]?.SKU}
                className="update-sku input"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="update-category">
            <label htmlFor="category">
              <span>Category</span>
              <br></br>
            </label>
            <select
              name="categoryID"
              id="categoryID"
              required
              value={category}
              onChange={handleFirstSelectChange}
              onClick={handleChange}
              defaultValue={poductData[0]?.categoryID}
              className="update-category-dropdown"
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
              defaultValue={poductData[0]?.sub_categoryID}
              className="admin-product-add-category-dropdown"
            >
              <option value="2">Men</option>
              <option value="1">Women</option>
              <option value="3">Unisex</option>
            </select>
          </div>
          <div className="update-container06">
            <div className="update-container07">
              <label htmlFor="category" className="update-attribute-label">
                <span>Attributes</span>
                <br></br>
              </label>
            </div>
            <div className="update-container08">
              <div className="update-container09">
                <div className="update-container10">
                  <span className="update-text15">Size</span>
                </div>
                <div className="update-container11">
                  {sizeOpt.map((item) => (
                    <div>
                      <Form.Check
                        type="radio"
                        id={item.value}
                        label={item.text}
                        name="attribute_valueID"
                        value={item.value}
                        onChange={handleChange}
                        defaultValue={poductData[0]?.attributeID}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="update-container12">
                <div className="update-container13">
                  <span className="update-text17">Color</span>
                </div>
                <div className="update-container14">
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
          <div className="update-product-images">
            <label htmlFor="category">
              <span>Product Image</span>
              <br></br>
            </label>
            <div
              className="update-image-container"
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
          <div className="update-container15">
            <div className="update-container16">
              <button
                name="cancel"
                type="button"
                className="update-button1 button"
                onClick={props.handleClose}
              >
                Cancel
              </button>
            </div>
            <div className="update-container17">
              <button
                name="addUser" //chage the name
                type="submit"
                className="update-button2 button"
              >
                <span className="update-text24">
                  <span>Update Product</span>
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
