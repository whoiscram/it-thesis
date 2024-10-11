import React from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import '../css/order-customize.css'

const OrderCustomize = (props) => {
  return (
    <div className="order-customize-container">
      <Helmet>
        <title>OrderCustomize - exported project</title>
        <meta property="og:title" content="OrderCustomize - exported project" />
      </Helmet>
      <Header rootClassName="header-root-class-name7"></Header>
      <div className="order-customize-container01">
        <div className="order-customize-container02">
          <div className="order-customize-container03">
            <h1 className="order-customize-text">ACCOUNT</h1>
            <Link to="/profile" className="order-customize-navlink">
              Profile
            </Link>
            <Link to="/delivery-address" className="order-customize-navlink1">
              Delivery Address
            </Link>
            <span className="order-customize-text1">Customized Orders</span>
            <Link to="/order-premade" className="order-customize-navlink2">
              Order History
            </Link>
          </div>
        </div>
        <div className="order-customize-container04">
          <div className="order-customize-container05">
            <span className="order-customize-text2">My Orders</span>
            <svg viewBox="0 0 1024 1024" className="order-customize-icon">
              <path d="M366 708l196-196-196-196 60-60 256 256-256 256z"></path>
            </svg>
          </div>
          <div className="order-customize-container06">
            <div className="order-customize-container07">
              <img
                alt="image"
                src="/playground_assets/textile3-200w.png"
                className="order-customize-image"
              />
              <div className="order-customize-container08">
                <span className="order-customize-text3">Filipiniana</span>
              </div>
            </div>
            <div className="order-customize-container09">
              <span className="order-customize-text4">
                <span className="order-customize-text5">
                  Status:
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
                <span className="order-customize-text6">Pending</span>
              </span>
            </div>
            <div className="order-customize-container10">
              <Link
                to="/order-customize-details"
                className="order-customize-navlink3 button"
              >
                See Details
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer rootClassName="footer-root-class-name6"></Footer>
    </div>
  )
}

export default OrderCustomize
