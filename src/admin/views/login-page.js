import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import {baseURL} from '../../config'
import { setAuthToken } from "../views/main/js/AuthContext";
import { Helmet } from "react-helmet";

import "../views/login-page.css";

const LoginPage = (props) => {
  //Send post Request to->
  const URL = baseURL + "login.php";
  //Handlers for User input
  const [username, setUser] = useState("");
  const [password, setPwd] = useState("");

  //checks state of logged in user
  const [isLoggedIn, setLogin] = useState();
  // interchangable
  const [change, setChange] = useState(false);

  //Checks if user is already logged in, hides the login page
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setLogin(true);
      // update must not be window location must render admin-panel not redirect
      window.location.href = "/admin-panel";
    } else {
      setLogin(false);
    }
  }, [change]);

  // Handles post Request to server
  // Headers to be included
  const handleSubmit = (event) => {
    event.preventDefault();
    const user = { username, password };
    axios
      .post(URL, JSON.stringify(user))
      .then((res) => {
        if (res.status === 200) {
          const token = res.data;
          localStorage.setItem("token", token);
          setAuthToken(token);
          window.location.href = "/admin-panel";
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
    <div className="login-page-container">
      <Helmet>
        <title>Inabel ni Ina Admin Login</title>
        <meta property="og:title" content="Inabel ni Ina Admin Login" />
      </Helmet>
      <div className="login-page-container1">
        <h1 className="login-page-text">
          <span>Inabel ni Ina </span>
          <span>
            Ordering
            <span
              dangerouslySetInnerHTML={{
                __html: " ",
              }}
            />
          </span>
          <span> System</span>
          <br></br>
        </h1>
        <span className="login-page-text05">
          <span>A web-based application developed to manage orders </span>
          <span>
            of
            <span
              dangerouslySetInnerHTML={{
                __html: " ",
              }}
            />
          </span>
          <br></br>
          <span>Inabel ni Ina </span>
        </span>
        <form className="login-page-form" onSubmit={handleSubmit}>
          <span className="login-page-text10">
            <span>
              Login to start
              <span
                dangerouslySetInnerHTML={{
                  __html: " ",
                }}
              />
            </span>
            <span className="login-page-text12">session</span>
          </span>
          <input
            type="text"
            name="username"
            onChange={(e) => setUser(e.target.value)}
            placeholder="Username"
            className="login-page-user-name-input input"
          />
          <input
            type="password"
            name="password"
            required
            onChange={(e) => setPwd(e.target.value)}
            placeholder="Password"
            className="login-page-password-input input"
          />
          {/* <Link to="/admin-framenew" className="login-page-navlink button">
            Login
          </Link> */}

          {/* to be changed from </Link> */}
          <input
            type="submit"
            value="Login"
            className="login-page-navlink button"
          ></input>
          {/* to be changed from </Link> */}
        </form>
        <img
          alt="IMAGE1208903751049488680532407736497506770042787nr6071"
          src="/playground_assets/White-Font (INABEL-NI-INA).png"
          className="login-page-i-m-a-g-e1208903751049488680532407736497506770042787nr"
        />
      </div>
    </div>
  );
};

export default LoginPage;
