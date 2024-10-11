import React, { useEffect, useState } from "react";

import { Helmet } from "react-helmet";
import axios from "axios";
import AdminHeader from "../../../components/admin-header";
import Dashboard from "./dashboard";
import Inventory from "./product";
import Categories from "./categories";
import Attributes from "./attributes";
import Orders from "./orders";
import Users from "./user";
import Profile from "./profile";
import "../../../components/admin-sidebar.css";
import "../../main/css/admin-panel.css";
import UserLog from "./historyLog";
import jwt_decode from "jwt-decode";

const AdminPanel = (props) => {
  const [hasRender, setRender] = useState(false);
  const [data, setData] = useState("");
  const [change, setChange] = useState(false);
  const [isLoggedIn, setLogin] = useState();
  //decode JWT token
  const decode = jwt_decode(localStorage.getItem("token"));
  const logged = decode.data.ID;

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setLogin(true);
      setData(logged);
      //dito papasok yung pag view nung user profile
      //decode TOKEN get ID
      //Pass ID through axios
      //to get and display user by ID
    } else {
      setLogin(false);
      navigate.push("/iniadminlogin");
    }
  }, [change]);

  return (
    <div className="main-container">
      <Helmet>
        <title>Panel</title>
        <meta property="og:title" content="Panel" />
      </Helmet>
      <div className="header-container">
        <AdminHeader rootClassName="header-root-class-name"></AdminHeader>
      </div>
      <div className="sub-container">
        <div className="sidebar-container">
          <div className="admin-sidebar">
            <nav className="sidebar-nav">
              <svg viewBox="0 0 1024 1024" className="sidebar-icon">
                <path
                  d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"
                  className=""
                ></path>
              </svg>
              <span
                onClick={() => setRender("dashboard")}
                className="sidebar-dashboard-text"
              >
                {" "}
                Dashboard{" "}
              </span>
              <span
                onClick={() => setRender("inventory")}
                className="sidebar-product-text"
              >
                {" "}
                Product Inventory
              </span>
              <span
                onClick={() => setRender("categories")}
                className="sidebar-categories-text"
              >
                {" "}
                Categories{" "}
              </span>
              <span
                onClick={() => setRender("attributes")}
                className="sidebar-attributes-text"
              >
                Attributes{" "}
              </span>
              <span
                onClick={() => setRender("orders")}
                className="sidebar-orders-text"
              >
                Orders
              </span>
              <span
                onClick={() => setRender("users")}
                className="sidebar-orders-text"
              >
                Users
              </span>
              <span
                onClick={() => setRender("userLog")}
                className="sidebar-orders-text"
              >
                User Logs
              </span>
              <span
                onClick={() => setRender("profile")}
                className="sidebar-orders-text"
              >
                Profile
              </span>
            </nav>
          </div>
        </div>

        <div className="table-container">
          {hasRender === "dashboard" && <Dashboard />}
          {hasRender === "inventory" && <Inventory />}
          {hasRender === "categories" && <Categories />}
          {hasRender === "attributes" && <Attributes />}
          {hasRender === "orders" && <Orders />}
          {hasRender === "users" && <Users />}
          {hasRender === "userLog" && <UserLog />}
          {hasRender === "profile" && <Profile data={data} />}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
