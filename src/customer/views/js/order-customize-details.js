import React from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import '../css/order-customize-details.css'

const OrderCustomizeDetails = (props) => {
  return (
    <div className="order-customize-details-container">
      <Helmet>
        <title>OrderCustomizeDetails - exported project</title>
        <meta
          property="og:title"
          content="OrderCustomizeDetails - exported project"
        />
      </Helmet>
      <Header rootClassName="header-root-class-name7"></Header>
      <div className="order-customize-details-container01">
        <div className="order-customize-details-container02">
          <div className="order-customize-details-container03">
            <h1 className="order-customize-details-text">ACCOUNT</h1>
            <Link to="/profile" className="order-customize-details-navlink">
              Profile
            </Link>
            <Link
              to="/delivery-address"
              className="order-customize-details-navlink1"
            >
              Delivery Address
            </Link>
            <span className="order-customize-details-text01">
              Customized Orders
            </span>
            <Link
              to="/order-premade"
              className="order-customize-details-navlink2"
            >
              Order History
            </Link>
          </div>
        </div>
        <div className="order-customize-details-container04">
          <div className="order-customize-details-container05">
            <Link
              to="/order-customize"
              className="order-customize-details-navlink3"
            >
              My Orders
            </Link>
            <svg
              viewBox="0 0 1024 1024"
              className="order-customize-details-icon"
            >
              <path d="M366 708l196-196-196-196 60-60 256 256-256 256z"></path>
            </svg>
            <span>Details</span>
          </div>
          <div className="order-customize-details-container06">
            <div className="order-customize-details-container07">
              <div className="order-customize-details-container08">
                <img
                  alt="image"
                  src="/playground_assets/textile3-200w.png"
                  className="order-customize-details-image"
                />
                <div className="order-customize-details-container09">
                  <span className="order-customize-details-text03">
                    Filipiniana
                  </span>
                </div>
              </div>
              <div className="order-customize-details-container10">
                <span className="order-customize-details-text04">
                  <span className="order-customize-details-text05">
                    Status:
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                  <span className="order-customize-details-text06">
                    Pending
                  </span>
                </span>
              </div>
            </div>
            <div className="order-customize-details-container11">
              <span>Measurements:</span>
              <div className="order-customize-details-container12">
                <span>Bust: 26cm</span>
                <span>Waist: 15cm</span>
                <span>Hips : 0cm</span>
                <span>Back Width: 40cm</span>
                <span>Front Chest: 40cm</span>
                <span>Shoulder: 40cm</span>
                <span>Under Bust: 40cm</span>
                <span>Upper Arm: 40cm</span>
                <span>Front Shoulder to Waist: 40cm</span>
                <span>Skirt Length: 40cm</span>
              </div>
            </div>
            <div className="order-customize-details-container13">
              <span className="order-customize-details-text18">
                Total Price:
              </span>
              <span className="order-customize-details-text19">P2,500.00</span>
            </div>
            <div className="order-customize-details-container14">
              <Link
                to="/order-customize-details"
                className="order-customize-details-navlink4 button"
              >
                Cancel Order
              </Link>
              <Link
                to="/order-customize-details"
                className="order-customize-details-navlink5 button"
              >
                Pay
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer rootClassName="footer-root-class-name6"></Footer>
    </div>
  )
}

export default OrderCustomizeDetails
