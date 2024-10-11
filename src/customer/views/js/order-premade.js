import React from "react";
import { Link } from "react-router-dom";

import { Helmet } from "react-helmet";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../css/order-premade.css";
import OrderHistory from "../../components/OrderHistory";

const OrderPremade = (props) => {
  return (
    <div className="order-premade-container">
      <Helmet>
        <title>OrderPremade - exported project</title>
        <meta property="og:title" content="OrderPremade - exported project" />
      </Helmet>
      <Header rootClassName="header-root-class-name7"></Header>
      <div className="order-premade-container01">
        <div className="order-premade-container02">
          <h1 className="order-premade-text">ACCOUNT</h1>
          <Link to="/profile" className="order-premade-navlink">
            Profile
          </Link>
          <Link to="/delivery-address" className="order-premade-navlink1">
            Delivery Address
          </Link>
          <Link to="/order-customize" className="order-premade-navlink2">
            Customized Orders
          </Link>
          <span className="order-premade-text01">Order History</span>
        </div>
        <div className="order-premade-container03">
          <div className="order-premade-container04">
            <span className="order-premade-text02">My Orders</span>
          </div>
          {/*<div className="order-premade-container05">
            <div className="order-premade-container06">
              <img
                alt="image"
                src="/playground_assets/cleobag-200h.png"
                className="order-premade-image"
              />
            </div>
            <div className="order-premade-container07">
              <span className="order-premade-text03">Cleo - Red</span>
              <div className="order-premade-container08">
                <span className="order-premade-text04">
                  <span className="order-premade-text05">Total:</span>
                  <span className="order-premade-text06">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                  <span className="order-premade-text07">₱</span>
                  <span className="order-premade-text08">1,300.00</span>
                </span>
                <span className="order-premade-text09">Qty: 1</span>
                <div className="order-premade-container09">
                  <span className="order-premade-text10">
                    <span className="order-premade-text11">
                      Status:
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                    <span className="order-premade-text12">Pending</span>
                  </span>
                </div>
              </div>
            </div> */}
            {/*<div className="order-premade-container10">
              <Link
                to="/order-premade-details"
                className="order-premade-navlink3 button"
              >
                See Details
              </Link>
            </div>
          </div>
          <div className="order-premade-container11">
            <div className="order-premade-container12">
              <img
                alt="image"
                src="/playground_assets/cleobag-200h.png"
                className="order-premade-image1"
              />
            </div>
            <div className="order-premade-container13">
              <span className="order-premade-text13">Cleo - Red</span>
              <div className="order-premade-container14">
                <span className="order-premade-text14">
                  <span className="order-premade-text15">Total:</span>
                  <span className="order-premade-text16">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                  <span className="order-premade-text17">₱</span>
                  <span className="order-premade-text18">1,300.00</span>
                </span>
                <span className="order-premade-text19">Qty: 1</span>
                <div className="order-premade-container15">
                  <span className="order-premade-text20">
                    <span className="order-premade-text21">
                      Status:
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                    <span className="order-premade-text22">Received</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="order-premade-container16">
              <Link
                to="/order-premade-details"
                className="order-premade-navlink4 button"
              >
                See Details
              </Link>
            </div>
          </div> */}
          {<OrderHistory />}
        </div>
      </div>
      <Footer rootClassName="footer-root-class-name6"></Footer>
    </div>
  );
};

export default OrderPremade
