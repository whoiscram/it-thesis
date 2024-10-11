import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./style.css";
import AdminAddAttributes1 from "./admin/views/forms/add/js/add-attribute";
import AddCategory from "./admin/views/forms/add/js/add-category";
import AddProduct from "./admin/views/forms/add/js/add-product";
import AddUser from "./admin/views/forms/add/js/add-user";
import LogIn from "./customer/views/js/log-in";
import ContactUs from "./customer/views/js/contact-us";
import Shop from "./customer/views/js/shop";
import SignUp from "./customer/views/js/sign-up";
import OurStory from "./customer/views/js/our-story";
import Profile from "./customer/views/js/profile";
import Homepage from "./customer/views/js/homepage";
import FAQs from "./customer/views/js/f-a-qs";
import ProtectedRoute from "react-protected-route-component";
import LoginPage from "./admin/views/login-page";
import AdminPanel from "./admin/views/main/js/admin-panel";
import ProductDetails from "./customer/views/js/product-details";
import CustomSummary from "./customer/views/js/custom-summary";
import Customize from "./customer/views/js/customize";
import Checkout from "./customer/views/js/checkout";
import ProductRating from "./customer/views/js/product-rating";
import Rating from "./customer/views/js/rating";
import OrderCustomize from "./customer/views/js/order-customize";
import OrderPremade from "./customer/views/js/order-premade";
import OrderCustomizeDetails from "./customer/views/js/order-customize-details";
import OrderPremadeDetails from "./customer/views/js/order-premade-details";
import Cart from "./customer/views/js/cart";
import MeasuringGuide from "./customer/views/js/measuring-guide";
import DeliveryAddress from "./customer/views/js/delivery-address";

const App = () => {
  return (
    <Router>
      <div>
        {/* public routes */}
        <Route exact component={LoginPage} path="/iniadminlogin" />

        {/* admin  views > forms > add */}
        <Route exact component={AdminAddAttributes1} path="/add-attribute" />
        <Route exact component={AddCategory} path="/add-category" />
        <Route exact component={AddProduct} path="/add-product" />
        <Route exact component={AddUser} path="/add-user" />

        <Route component={LogIn} exact path="/log-in" />
        <Route component={ContactUs} exact path="/contact-us" />
        <Route component={DeliveryAddress} exact path="/delivery-address" />
        <Route component={Shop} exact path="/shop" />
        <Route component={SignUp} exact path="/sign-up" />
        <Route component={OurStory} exact path="/our-story" />
        <Route component={Profile} exact path="/profile" />
        <Route component={Homepage} exact path="/" />
        <Route component={FAQs} exact path="/faqs" />
        <Route component={ProductDetails} exact path="/product-details" />
        <Route component={CustomSummary} exact path="/custom-summary" />
        <Route component={Checkout} exact path="/checkout" />
        <Route component={Customize} exact path="/customize" />
        <Route component={ProductRating} exact path="/product-rating" />
        <Route component={Rating} exact path="/rating" />
        <Route component={OrderCustomize} exact path="/order-customize" />
        <Route component={OrderPremade} exact path="/order-premade" />
        <Route component={OrderCustomizeDetails} exact path="/order-customize-details" />
        <Route component={OrderPremadeDetails} exact path="/order-premade-details" />
        <Route component={Cart} exact path="/cart" />
        <Route component={MeasuringGuide} exact path="/measuring-guide" />

        {/* private routes */}
        <ProtectedRoute
          path="/admin-panel"
          redirectRoute="/iniadminlogin"
          guardFunction={() => {
            const token = localStorage.getItem("token");
            if (token) {
              return true;
            } else {
              return false;
            }
          }}
          component={AdminPanel}
          exact
        />
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
