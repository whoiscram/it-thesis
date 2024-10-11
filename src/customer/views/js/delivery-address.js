import React from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import '../css/delivery-address.css'

const DeliveryAddress = (props) => {
  return (
    <div className="delivery-address-container">
      <Helmet>
        <title>DeliveryAddress - exported project</title>
        <meta
          property="og:title"
          content="DeliveryAddress - exported project"
        />
      </Helmet>
      <Header rootClassName="header-root-class-name29"></Header>
      <div className="delivery-address-container01">
        <div className="delivery-address-container02">
          <h1 className="delivery-address-text">ACCOUNT</h1>
          <Link to="/profile" className="delivery-address-navlink">
            Profile
          </Link>
          <span className="delivery-address-navlink1">Delivery Address</span>
          <Link to="/order-customize" className="delivery-address-navlink2">
            Customized Orders
          </Link>
          <Link to="/order-premade" className="delivery-address-navlink3">
            Order History
          </Link>
        </div>
        <div className="delivery-address-container03">
          <div className="delivery-address-container04">
            <span className="delivery-address-text01">My Address</span>
          </div>
          <div className="delivery-address-container05">
            <div className="delivery-address-container06">
              <span className="delivery-address-text02">Home Address</span>
              <div className="delivery-address-container07">
                <span className="delivery-address-text03">
                  7020, Narra St, Kias, Baguio City, Benguet
                </span>
                <div className="delivery-address-container08"></div>
              </div>
            </div>
            <div className="delivery-address-container09">
              <button className="delivery-address-button button">EDIT</button>
              <button className="delivery-address-button1 button">
                <span className="delivery-address-text04">
                  DELETE
                  <br></br>
                </span>
              </button>
            </div>
          </div>
          <div className="delivery-address-container10">
            <div className="delivery-address-container11">
              <span className="delivery-address-text06">Work Address</span>
              <div className="delivery-address-container12">
                <span className="delivery-address-text07">
                  3F MM GARA Building, Bakakeng Central, Baguio City
                </span>
                <div className="delivery-address-container13"></div>
              </div>
            </div>
            <div className="delivery-address-container14">
              <button className="delivery-address-button2 button">EDIT</button>
              <button className="delivery-address-button3 button">
                <span className="delivery-address-text08">
                  DELETE
                  <br></br>
                </span>
              </button>
            </div>
          </div>
          <div className="delivery-address-container15">
            <div className="delivery-address-container16">
              <Link
                to="/change-address"
                className="delivery-address-navlink6 button"
              >
                <svg viewBox="0 0 1024 1024" className="delivery-address-icon">
                  <path d="M512 854q140 0 241-101t101-241-101-241-241-101-241 101-101 241 101 241 241 101zM512 86q176 0 301 125t125 301-125 301-301 125-301-125-125-301 125-301 301-125zM554 298v172h172v84h-172v172h-84v-172h-172v-84h172v-172h84z"></path>
                </svg>
                <span className="delivery-address-text10">
                  <br></br>
                  <span>ADD NEW ADDRESS</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer rootClassName="footer-root-class-name29"></Footer>
    </div>
  )
}

export default DeliveryAddress
