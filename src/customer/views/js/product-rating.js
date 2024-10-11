import React from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import '../css/product-rating.css'
import Rating from './rating'

const ProductRating = (props) => {
  return (
    <div className="product-rating-container">
      <Helmet>
        <title>Rate Product</title>
        <meta property="og:title" content="ProductRating - exported project" />
      </Helmet>
      <Header rootClassName="header-root-class-name7"></Header>
      <div className="product-rating-container1">
        <div className="product-rating-container2">
          <div className="product-rating-container3">
            <span className="product-rating-text">Write Review</span>
          </div>
          <div className="product-rating-container4">
            <span className="product-rating-text1">
              Delivered on October 31, 2022
            </span>
            <div className="product-rating-container5">
              <img
                alt="image"
                src="/playground_assets/cleobag-200h.png"
                className="product-rating-image"
              />
              <span className="product-rating-text2">Cleo - Red</span>
            </div>
            <span className="product-rating-text3">Qty: 1</span>
            <span className="product-rating-text4">
              <span className="product-rating-text5">Order Total:</span>
              <span className="product-rating-text6">
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <span className="product-rating-text7">₱</span>
              <span className="product-rating-text8">1,300.00</span>
            </span>
          </div>
          <div className="product-rating-container6">
          <Rating />
          </div>
          <textarea
            placeholder="What do you think of this product?"
            className="product-rating-textarea textarea"
          ></textarea>
          <div className="product-rating-container7">
            <Link to="/order-premade" className="product-rating-navlink button">
              Cancel
            </Link>
            <button className="product-rating-button button">Publish</button>
          </div>
        </div>
      </div>
      <Footer rootClassName="footer-root-class-name6"></Footer>
    </div>
  )
}

export default ProductRating
