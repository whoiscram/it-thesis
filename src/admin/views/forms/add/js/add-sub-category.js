import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import Select from "react-select";
import { TagsInput } from "react-tag-input-component";
import "../../add/css/add-sub-category.css";
import {baseURL} from '../../../../../config'
const AdminAddSubCategory = (props) => {
  const [inputs, setInputs] = useState([]);

  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   setInputs((values) => ({ ...values, [name]: value }));
  // };

  const handleChange = (value) => {
    setInputs(value);
  };

  const { data } = props;

  console.log(data);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    axios
      .post(`${baseURL}categoryCRUD.php?addSubCategory=${data}`, inputs)
      .then(function (response) {
        console.log(response.data);
        window.alert("Subcategory added.");
        location.reload();
      });
  };

  const [selected, setSelected] = useState(["Small"]);

  return (
    <div className="add-sub-cat1-container">
      <Helmet>
        <title>adminAddAttributes1 - exported project</title>
        <meta
          property="og:title"
          content="adminAddAttributes1 - exported project"
        />
      </Helmet>
      <div className="add-sub-cat1-container1">
        <h1 className="add-sub-cat1-text">
          <span className="add-sub-cat1-text1">Category Name</span>
          <br></br>
        </h1>
        <form className="add-sub-cat1-form" onSubmit={handleSubmit}>
          <div className="add-sub-cat1-container2">
            <div className="add-sub-cat1-container3">
              <label htmlFor="subCatvalue">Subcategory</label>
              <div className="add-sub-cat1-input">
                <TagsInput
                  value={inputs}
                  onChange={handleChange}
                  name="subCategory"
                />
              </div>
            </div>
          </div>
          <div className="add-sub-cat1-container4">
            <div className="add-sub-cat1-container5">
              <div className="add-sub-cat1-container6">
                <button
                  name="cancel"
                  type="button"
                  className="add-sub-cat1-button button"
                  onClick={props.handleClose}
                >
                  Cancel
                </button>
              </div>
              <div className="add-sub-cat1-container7">
                <button
                  name="addUser"
                  type="submit"
                  className="add-sub-cat1-button1 button"
                >
                  <span className="add-sub-cat1-text4">
                    <span>Add</span>
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

export default AdminAddSubCategory;
