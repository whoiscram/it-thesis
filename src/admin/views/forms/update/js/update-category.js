import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import Select from "react-select";
import {baseURL} from '../../../../../config'
import "../../update/css/update-category.css";

const AdminAddAttributes1 = (props) => {
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
      .post(baseURL + "attrCRUD.php?addAttribute=", inputs)
      .then(function (response) {
        console.log(response.data);
        window.alert("Attribute added.");
        location.reload();
      });
  };

  const [selectedOptions, setSelectedOptions] = useState();

  // Array of all options shoould be from database
  const optionList = [
    { value: "men", label: "Men" },
    { value: "women", label: "Women" },
    { value: "unisex", label: "Unisex" },
    { value: "clothing", label: "Clothing" },
    { value: "bagsAndPouches", label: "Bags and Pouches" },
    { value: "accessories", label: "Accessories" },
  ];

  function handleSelect(data) {
    setSelectedOptions(data);
  }

  return (
    <div className="update-sub-cat1-container">
      <Helmet>
        <title>adminAddAttributes1 - exported project</title>
        <meta
          property="og:title"
          content="adminAddAttributes1 - exported project"
        />
      </Helmet>
      <div className="update-sub-cat1-container1">
        <h1 className="update-sub-cat1-text">
          <span className="update-sub-cat1-text1">Category Name</span>
          <br></br>
        </h1>
        <form className="update-sub-cat1-form" onSubmit={handleSubmit}>
          <div className="update-sub-cat1-container2">
            <div className="update-sub-cat1-container3">
              <label htmlFor="subCatvalue">Subcategory</label>
              <Select
                options={optionList}
                placeholder="Select Subcategory"
                value={selectedOptions}
                onChange={handleSelect}
                className="update-sub-cat1-input"
                isSearchable={true}
                isMulti
              />
            </div>
          </div>
          <div className="update-sub-cat1-container4">
            <div className="update-sub-cat1-container5">
              <div className="update-sub-cat1-container6">
                <button
                  name="cancel"
                  type="button"
                  className="update-sub-cat1-button button"
                  onClick={props.handleClose}
                >
                  Cancel
                </button>
              </div>
              <div className="update-sub-cat1-container7">
                <button
                  name="updateSubCat"
                  type="submit"
                  className="update-sub-cat1-button1 button"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddAttributes1;
