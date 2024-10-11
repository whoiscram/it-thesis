import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import {baseURL} from '../../../../../config'
import "../../display/css/view-user.css";

const AdminUserView2 = (props) => {
  const { data } = props;

  const [user, setUsers] = useState([]);
  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    const url = `${baseURL}CRUD.php?viewUser=${data}`;
    axios
      .get(url)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.error("Error:"));
  };

  console.log(user);

  return (
    <div className="view-user-container">
      <Helmet>
        <title>Admin-User-View2 - exported project</title>
        <meta
          property="og:title"
          content="Admin-User-View2 - exported project"
        />
      </Helmet>
      <div className="view-user-container1">
        <div className="view-user-header">
          <h1 className="view-user-text">USER DETAILS</h1>
        </div>

        <div className="view-user-user-details">
          <div className="view-user-user-name">
            <div className="view-user-background">
              <h3 className="view-user-title"> Basic Information</h3>
            </div>
            <div className="view-user-basic-info-container">
              <div className="view-user-user-type-container">
                <label className="view-user-text01">
                  <span>User Type</span>
                  <br></br>
                </label>
                <label className="view-user-text04">
                  <span>{user.userType}</span>
                  <br></br>
                </label>
              </div>
              <div className="view-user-user-name-container">
                <label className="view-user-text07">
                  <span>User Name</span>
                  <br></br>
                </label>
                <label className="view-user-text10">
                  <span>{user.userName}</span>
                  <br></br>
                </label>
              </div>
              <div className="view-user-first-name-container">
                <label className="view-user-text13">
                  <span>First Name</span>
                  <br></br>
                </label>
                <label className="view-user-text16">
                  <span>{user.firstName}</span>
                  <br></br>
                </label>
              </div>
              <div className="view-user-last-name-container">
                <label className="view-user-text19">
                  <span>Last Name</span>
                  <br></br>
                </label>
                <label className="view-user-text22">
                  <span>{user.lastName}</span>
                  <br></br>
                </label>
              </div>
            </div>
          </div>
          <div className="view-user-contact-information">
            <div className="view-user-background1">
              <h3 className="view-user-title1">Contact Information</h3>
            </div>
            <div className="view-user-contact-info-container">
              <div className="view-user-phone-number-container">
                <label className="view-user-text25">
                  <span>Phone Number</span>
                  <br></br>
                </label>
                <label className="view-user-text28">
                  <span>{user.phoneNumber}</span>
                  <br></br>
                </label>
              </div>
              <div className="view-user-email-container">
                <label className="view-user-text31">
                  <span>Email</span>
                  <br></br>
                </label>
                <label className="view-user-text34">{user.email}</label>
              </div>
              <div className="view-user-password-container">
                <label className="view-user-text35">
                  <span>Password (&gt;)</span>
                  <br></br>
                </label>
                <label className="view-user-text38">
                  <span>{user.password}</span>
                  <br></br>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="view-user-container2">
          <button
            name="Cancel"
            type="button"
            className="view-user-button button"
            onClick={props.handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminUserView2;
