import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import {baseURL} from '../../../../../config'
import "../../add/css/add-category.css";

const AdminCategoriesAddCategories = (props) => {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    axios
      .post(baseURL + "categoryCRUD.php?addCategory=", inputs)
      .then(function (response) {
        console.log(response.data);
        window.alert("Category added.");
        location.reload();
      });
  };

  return (
    <div className="admin-categories-add-categories-container">
      <Helmet>
        <title>Admin-Categories-Add-Categories - exported project</title>
        <meta
          property="og:title"
          content="Admin-Categories-Add-Categories - exported project"
        />
      </Helmet>
      <div className="admin-categories-add-categories-container1">
        <h1 className="admin-categories-add-categories-text">
          <span className="admin-categories-add-categories-text1">
            Add New Category
          </span>
          <br></br>
        </h1>
        <form
          className="admin-categories-add-categories-form"
          onSubmit={handleSubmit}
        >
          <div className="admin-categories-add-categories-container2">
            <div className="admin-categories-add-categories-container3">
              <label htmlFor="attributevalue">Category Name</label>
              <input
                type="text"
                id="category"
                name="category"
                required
                placeholder="ex: Clothing"
                className="admin-categories-add-categories-input input"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="admin-categories-add-categories-container4">
            <div className="admin-categories-add-categories-container5">
              <div className="admin-categories-add-categories-container6">
                <button
                  name="cancel"
                  type="button"
                  className="admin-categories-add-categories-button button"
                  onClick={props.handleClose}
                >
                  Cancel
                </button>
              </div>
              <div className="admin-categories-add-categories-container7">
                <button
                  name="addUser"
                  type="submit"
                  className="admin-categories-add-categories-button1 button"
                >
                  <span className="admin-categories-add-categories-text4">
                    <span>Add Category</span>
                    <br></br>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCategoriesAddCategories;
