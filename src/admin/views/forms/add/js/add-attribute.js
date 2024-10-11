import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import jwt_decode from "jwt-decode";

import { baseURL } from "../../../../../config";
import "../../add/css/add-attribute.css";

const AdminAddAttributes1 = (props) => {
  const [inputs, setInputs] = useState({});

  const decode = jwt_decode(localStorage.getItem("token"));
  const userType = decode.data.userType;
  const userID = decode.data.ID;
  const username = decode.data.username;
  const currentDate = new Date();
  const date = currentDate.toLocaleDateString();
  const formattedDate = date.split("-").join("-");
  console.log(formattedDate);
  const action = "Added Attribute Value";
  const description = "Added an Attribute";

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      userType: userType,
      date: formattedDate,
      userID: userID,
      action: action,
      desc: description,
    };

    axios
      .post(baseURL + "attrCRUD.php?addAttribute=", inputs)
      .then((response) => {
        console.log(response.data);
        window.alert("Product Succesfully updated");
        return axios.post(baseURL + "userLog.php", formData);
      })
      .then((response) => {
        console.log(response.data);
        window.alert("Attribute value added.");
        location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="admin-add-attributes1-container">
      <Helmet>
        <title>adminAddAttributes1 - exported project</title>
        <meta
          property="og:title"
          content="adminAddAttributes1 - exported project"
        />
      </Helmet>
      <div className="admin-add-attributes1-container1">
        <h1 className="admin-add-attributes1-text">
          <span className="admin-add-attributes1-text1">Attribute Name</span>
          <br></br>
        </h1>
        <form className="admin-add-attributes1-form" onSubmit={handleSubmit}>
          <div className="admin-add-attributes1-container2">
            <div className="admin-add-attributes1-container3">
              <label htmlFor="attributevalue">Attribute Name</label>
              <input
                type="text"
                id="attribute"
                name="attribute"
                required
                placeholder="ex: Size"
                className="admin-add-attributes1-input input"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="admin-add-attributes1-container4">
            <div className="admin-add-attributes1-container5">
              <div className="admin-add-attributes1-container6">
                <button
                  name="cancel"
                  type="button"
                  className="admin-add-attributes1-button button"
                  onClick={props.handleClose}
                >
                  Cancel
                </button>
              </div>
              <div className="admin-add-attributes1-container7">
                <button
                  name="addUser"
                  type="submit"
                  className="admin-add-attributes1-button1 button"
                >
                  <span className="admin-add-attributes1-text4">
                    <span>Add Attribute</span>
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

export default AdminAddAttributes1;
