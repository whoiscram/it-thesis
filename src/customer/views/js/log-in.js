import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import {baseURL} from '../../../config'
import { Helmet } from "react-helmet";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";
import { setAuthToken } from "../../../admin/views/main/js/AuthContext";
import "../css/log-in.css";

const LogIn = (props) => {
  let history = useHistory();
  const [username, setUser] = useState("");
  const [password, setPwd] = useState("");

  //checks state of logged in user
  const [isLoggedIn, setLogin] = useState();
  // interchangable
  const [change, setChange] = useState(false);

  //Checks if user is already logged in, hides the login page
  useEffect(() => {
    if (localStorage.getItem("customerToken") !== null) {
      setLogin(true);
      history.push("/profile");
    } else {
      setLogin(false);
    }
  }, [change]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = { username, password };
    axios
      .post(baseURL + "customerLogin.php", JSON.stringify(user))
      .then((res) => {
        if (res.status === 200) {
          const token = res.data;
          localStorage.setItem("customerToken", token);
          setAuthToken(token);
          window.location.href = "/"; //redirect  to another component
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          window.alert("Unauthorized");
        } else if (err.response.status === 403) {
          window.alert("Credetials Do Not Match");
        } else if (err.response.status === 400) {
          window.alert("User is not existing");
        }
      });
  };

  return (
    <div className="log-in-container">
      <Helmet>
        <title>Log In</title>
        <meta property="og:title" content="Log-In - exported project" />
      </Helmet>
      <Header rootClassName="header-root-class-name2"></Header>
      <div className="log-in-container1">
        <div className="log-in-container2">
          <h1 className="log-in-text">Welcome,</h1>
          <span className="log-in-text1">Please log in to continue</span>
        </div>
        <form className="log-in-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="log-in-input input"
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="log-in-textinput input"
            onChange={(e) => setPwd(e.target.value)}
          />
          <span className="log-in-text2">Forgot your password?</span>
        </form>
        <Link className="log-in-navlink button" onClick={handleSubmit}>
          LOGIN
        </Link>
        <span className="log-in-text3">OR</span>
        <span className="log-in-text4">
          <span className="log-in-text5">Not a member? </span>
          <Link to="/sign-up" className="log-in-navlink1">
            Register now
          </Link>
        </span>
      </div>
      <Footer rootClassName="footer-root-class-name2"></Footer>
    </div>
  );
};
export default LogIn;
