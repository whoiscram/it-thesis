import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";
import {baseURL} from '../../config'
import {
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
} from "@coreui/react";

import "./admin-header.css";
import axios from "axios";

const AdminHeader = (props) => {
  //Handles user logged in
  const [isLoggedIn, setLogin] = useState();
  const [change, setChange] = useState(false);
  const [hasRender, setRender] = useState(false);
  const [data, setData] = useState("");

  //Handles logout by removing the token
  const logout = () => {
    //Removes the token from localSTorage
    localStorage.removeItem("token");
    //Needs to be REFINED , better thatn window.location.href.
    window.location.href = "/iniadminlogin";
  };

  const decode = jwt_decode(localStorage.getItem("token"));
  const userID = decode.data.ID;

  const [user, setUsers] = useState([]);

  let firstName = user.firstName;
  let lastName = user.lastName;

  //optional Chaining
  const firstname = firstName?.toUpperCase() || "";
  const lastname = lastName?.toUpperCase() || "";

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    const url = baseURL + "CRUD.php?profile=" + userID;
    axios
      .get(url)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.error("Error:"));
  };
  return (
    <header
      data-role="Header"
      className={`admin-header-admin-header ${props.rootClassName} `}
    >
      <div className="admin-header-container">
        <div className="admin-header-container1">
          <img
            alt={props.iniImage_alt}
            src={props.iniImage_src}
            className="admin-header-ini-image"
          />
        </div>
        <span className="admin-header-ini-header-text">
          {props.iniHeaderText}
        </span>
        <div className="admin-header-container2">
          <div className="admin-header-container3">
            <div className="admin-header-container4">
              <div
                data-thq="thq-dropdown"
                className="admin-header-thq-dropdown list-item"
              >
                <div
                  data-thq="thq-dropdown-toggle"
                  className="admin-header-dropdown-toggle"
                >
                  <span className="admin-header-text">
                    {" "}
                    {firstname} {lastname}{" "}
                  </span>
                  <svg viewBox="0 0 1024 1024" className="admin-header-icon">
                    <path
                      d="M576 706.612v-52.78c70.498-39.728 128-138.772 128-237.832 0-159.058 0-288-192-288s-192 128.942-192 288c0 99.060 57.502 198.104 128 237.832v52.78c-217.102 17.748-384 124.42-384 253.388h896c0-128.968-166.898-235.64-384-253.388z"
                      className=""
                    ></path>
                  </svg>
                  <div
                    data-thq="thq-dropdown-arrow"
                    className="admin-header-dropdown-arrow"
                  >
                    <svg viewBox="0 0 1024 1024" className="admin-header-icon2">
                      <path
                        d="M366 708l196-196-196-196 60-60 256 256-256 256z"
                        className=""
                      ></path>
                    </svg>
                  </div>
                </div>
                <ul
                  data-thq="thq-dropdown-list"
                  className="admin-header-dropdown-list"
                >
                 
                  <li
                    data-thq="thq-dropdown"
                    className="admin-header-dropdown1 list-item"
                  >
                    <div
                      data-thq="thq-dropdown-toggle"
                      className="admin-header-dropdown-toggle2"
                    >
                      <span className="admin-header-text2" onClick={logout}>
                        Log Out
                      </span>
                    </div>
                  </li>
                  <li
                    data-thq="thq-dropdown"
                    className="admin-header-dropdown2 list-item"
                  ></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

AdminHeader.defaultProps = {
  iniImage_alt: "logo",
  rootClassName: "",
  iniHeaderText: "Inabel ni Ina",
  iniImage_src: "/playground_assets/iniAdminLogo.png",
};

AdminHeader.propTypes = {
  iniImage_alt: PropTypes.string,
  rootClassName: PropTypes.string,
  iniHeaderText: PropTypes.string,
  iniImage_src: PropTypes.string,
};

export default AdminHeader;
