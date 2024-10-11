import React from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import '../css/order-premade-details.css'

const OrderPremadeDetails = (props) => {
  return (
    <div className="order-premade-details-container">
      <Helmet>
        <title>OrderPremadeDetails - exported project</title>
        <meta
          property="og:title"
          content="OrderPremadeDetails - exported project"
        />
      </Helmet>
      <Header rootClassName="header-root-class-name28"></Header>
      <div className="order-premade-details-container01">
        <div className="order-premade-details-container02">
          <div className="order-premade-details-container03">
            <h1 className="order-premade-details-text">ACCOUNT</h1>
            <Link to="/profile" className="order-premade-details-navlink">
              Profile
            </Link>
            <Link
              to="/delivery-address"
              className="order-premade-details-navlink1"
            >
              Delivery Address
            </Link>
            <Link
              to="/order-customize"
              className="order-premade-details-navlink2"
            >
              Customized Orders
            </Link>
            <span className="order-premade-details-navlink3">Order History</span>
          </div>
        </div>
        <div className="order-premade-details-container04">
          <div className="order-premade-details-container05">
            <Link
              to="/order-premade"
              className="order-premade-details-navlink4"
            >
              My Orders
            </Link>
            <svg viewBox="0 0 1024 1024" className="order-premade-details-icon">
              <path d="M366 708l196-196-196-196 60-60 256 256-256 256z"></path>
            </svg>
            <span>Details</span>
          </div>
          <div className="order-premade-details-container06">
            <div className="order-premade-details-container07">
              <div className="order-premade-details-container08">
                <img
                  alt="image"
                  src="/playground_assets/cleobag-200h.png"
                  className="order-premade-details-image"
                />
                <div className="order-premade-details-container09">
                  <span className="order-premade-details-text02">
                    Cleo - Red
                  </span>
                </div>
              </div>
              <div className="order-premade-details-container10">
                <span className="order-premade-details-text03">
                  <span className="order-premade-details-text04">
                    Status:
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                  <span className="order-premade-details-text05">Received</span>
                  <br></br>
                </span>
              </div>
            </div>
            <div className="order-premade-details-container11">
              <span>Qty: 1</span>
              <span>Order No: 14390123415124</span>
              <span>Placed on: 06 Jan 2023</span>
              <span>Paid on: 06 Jan 2023</span>
              <span>Paid via: GCash</span>
            </div>
            <div className="order-premade-details-container12">
              <span className="order-premade-details-text12">Total Price:</span>
              <span className="order-premade-details-text13">P2,500.00</span>
            </div>
            <div className="order-premade-details-container13">
              <Link
                to="/product-rating"
                className="order-premade-details-navlink5 button"
              >
                Review
              </Link>
              <Link
                to="/checkout"
                className="order-premade-details-navlink6 button"
              >
                Buy Again
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer rootClassName="footer-root-class-name28"></Footer>
    </div>
  )
}

export default OrderPremadeDetails
