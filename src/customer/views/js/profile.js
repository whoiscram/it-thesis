import React from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import jwt_decode from "jwt-decode";
import "../css/profile.css";
import {baseURL} from '../../../config'
const Profile = (props) => {
  let history = useHistory();
  //checks state of logged in user
  const [isLoggedIn, setLogin] = useState();
  // interchangable
  const [change, setChange] = useState(false);
  const [user, setUsers] = useState();
  useEffect(() => {
    if (localStorage.getItem("customerToken") !== null) {
      const decode = jwt_decode(localStorage.getItem("customerToken"));
      const logged = decode.data.ID;
      setLogin(true);
      axios
        .get(`${baseURL}CRUD.php?profile=` + logged)
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => console.error("Error:"));

      history.push("/profile");
    } else {
      setLogin(false);
      history.push("/log-in");
    }
  }, [change]);

  //Temporary
  const logout = () => {
    //Removes the token from localSTorage
    localStorage.removeItem("customerToken");
    localStorage.removeItem("cart");
    //Needs to be REFINED , better thatn window.location.href.
    window.location.href = "/log-in";
  };

  return (
    <div className="profile-container">
      <Helmet>
        <title>Profile - exported project</title>
        <meta property="og:title" content="Profile - exported project" />
      </Helmet>
      <Header rootClassName="header-root-class-name7"></Header>
      <div className="profile-container01">
        <div className="profile-container02">
          <h1 className="profile-text">ACCOUNT</h1>
          <span className="profile-navlink">Profile</span>
          <Link to="/delivery-address" className="profile-navlink1">
            Delivery Address
          </Link>
          <Link to="/order-customize" className="profile-navlink2">
            Customized Orders
          </Link>
          <Link to="/order-premade" className="profile-navlink3">
            Order History
          </Link>
        </div>
        <div className="profile-container03">
          <form className="profile-form">
            <div className="profile-container04">
              <button className="profile-button button">EDIT PROFILE</button>
            </div>
            <div className="profile-container05">
              <span className="profile-text01">Full Name:</span>
              <div className="profile-container06">
                <span className="profile-text02">First Name</span>
                <span className="profile-text03">First Name</span>
              </div>
              <div className="profile-container07">
                <span className="profile-text04">Last Name</span>
                <span className="profile-text05">Last Name</span>
              </div>
            </div>
            <div className="profile-container08">
              <span className="profile-text06">Username:</span>
              <div className="profile-container09">
                <span className="profile-text07">Username</span>
              </div>
            </div>
            <div className="profile-container10">
              <span className="profile-text08">Email:</span>
              <div className="profile-container11">
                <span className="profile-text09">name@gmail.com</span>
              </div>
            </div>
            <div className="profile-container12">
              <span className="profile-text10">Phone Number:</span>
              <div className="profile-container13">
                <span className="profile-text11">+639000000000</span>
              </div>
            </div>
            <div className="profile-container14">
              <span className="profile-text12">Password:</span>
              <div className="profile-container15">
                <span className="profile-text13">**********</span>
              </div>
            </div>
            <div className="profile-container16">
              <button className="profile-button1 button" onClick={logout}>LOG OUT</button>
            </div>
          </form>
        </div>
      </div>
      <Footer rootClassName="footer-root-class-name6"></Footer>
    </div>
  );
};

export default Profile
