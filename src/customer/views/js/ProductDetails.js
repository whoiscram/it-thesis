import React from "react";

import { Helmet } from "react-helmet";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../css/product-details.css";

const ProductDetails = (props) => {
  return (
    <div className="product-details-container">
      <Helmet>
        <title>ProductDetails - exported project</title>
        <meta property="og:title" content="ProductDetails - exported project" />
      </Helmet>
      <Header rootClassName="header-root-class-name14"></Header>
      <div className="product-details-container01">
        <div className="product-details-container02">
          <img
            className="product-details-container03"
            src={props.location.state.detail.imageSource}
          ></img>
        </div>
        <div className="product-details-container04">
          <span className="product-details-text">Bags - Handbag </span>
          <h1 className="product-details-text1">
            {props.location.state.detail.productName}
          </h1>
          <span className="product-details-text2">
            ₱ {props.location.state.detail.price}{" "}
          </span>
          <div className="product-details-container05">
            <svg viewBox="0 0 1024 1024" className="product-details-icon">
              <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
            </svg>
            <svg viewBox="0 0 1024 1024" className="product-details-icon02">
              <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
            </svg>
            <svg viewBox="0 0 1024 1024" className="product-details-icon04">
              <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
            </svg>
            <svg viewBox="0 0 1024 1024" className="product-details-icon06">
              <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
            </svg>
            <svg viewBox="0 0 1024 1024" className="product-details-icon08">
              <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
            </svg>
            <span className="product-details-text3">1 review</span>
          </div>
          <div className="product-details-container06">
            <span className="product-details-text4">Size:</span>
            <select className="product-details-select">
              <option value="Option 1">Small</option>
              <option value="Option 2">Medium</option>
              <option value="Option 3">Large</option>
            </select>
          </div>
          <div className="product-details-container07">
            <span className="product-details-text5">Textile:</span>
            <img
              alt="image"
              src="https://images.unsplash.com/photo-1619043518800-7f14be467dca?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDEzfHxjbG90aHxlbnwwfHx8fDE2NjYwOTkwNjY&amp;ixlib=rb-1.2.1&amp;w=200"
              className="product-details-image"
            />
            <img
              alt="image"
              src="https://images.unsplash.com/photo-1594734415578-00fc9540929b?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDJ8fGNsb3RofGVufDB8fHx8MTY2NjA5OTA2Ng&amp;ixlib=rb-1.2.1&amp;w=200"
              className="product-details-image1"
            />
            <img
              alt="image"
              src="https://images.unsplash.com/photo-1554103494-90f9e0883a85?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDN8fGNsb3RofGVufDB8fHx8MTY2NjA5OTA2Ng&amp;ixlib=rb-1.2.1&amp;w=200"
              className="product-details-image2"
            />
            <img
              alt="image"
              src="https://images.unsplash.com/photo-1618437542145-38e9015cf8f1?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDR8fGNsb3RofGVufDB8fHx8MTY2NjA5OTA2Ng&amp;ixlib=rb-1.2.1&amp;w=200"
              className="product-details-image3"
            />
            <img
              alt="image"
              src="https://images.unsplash.com/photo-1613007326658-3aeb881749d1?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDE4fHxjbG90aHxlbnwwfHx8fDE2NjYwOTkwNjY&amp;ixlib=rb-1.2.1&amp;w=200"
              className="product-details-image4"
            />
          </div>
          <div className="product-details-container08">
            <span className="product-details-text6">8 in stock</span>
          </div>
          <div className="product-details-container09">
            <div className="product-details-container10">
              <svg viewBox="0 0 1024 1024" className="product-details-icon10">
                <path d="M810 554h-596v-84h596v84z"></path>
              </svg>
              <span className="product-details-text7">1</span>
              <svg viewBox="0 0 1024 1024" className="product-details-icon12">
                <path d="M810 554h-256v256h-84v-256h-256v-84h256v-256h84v256h256v84z"></path>
              </svg>
            </div>
            <button className="product-details-button button">
              ADD TO CART
            </button>
          </div>
          <button className="product-details-button1 button">BUY NOW</button>
        </div>
      </div>
      <Footer rootClassName="footer-root-class-name14"></Footer>
    </div>
  );
};

export default ProductDetails;
