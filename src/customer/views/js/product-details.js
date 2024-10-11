import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import Zoom from "react-img-zoom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../css/product-details.css";
import jwt_decode from "jwt-decode";
import axios from "axios";
import InputSpinner from "react-bootstrap-input-spinner";

const ProductDetails = (props) => {
  let history = useHistory();

  const [qty, setQty] = useState(1);
  var storedData = JSON.parse(localStorage.productData);

  function handleChange(event) {
    console.log(event);
    setQty(event);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (localStorage.getItem("customerToken") != null) {
      var productName = storedData.productName;
      var price = storedData.price;
      var quantity = []; //store array
      var productID = storedData.productID;
      var imageSource = storedData.imageSource;
      var setQty = {
        quantity: qty,
        product: productName,
        price: price,
        productID: productID,
        imageSource: imageSource,
      };
      quantity.push(setQty);
      quantity = quantity.concat(
        JSON.parse(localStorage.getItem("cart") || "[]")
      );
      localStorage.setItem("cart", JSON.stringify(quantity));
      history.push({
        pathname: "/cart",
      });
    } else {
      window.location.href = "/log-in";
      window.alert("PLEASE LOG IN FIRST");
    }
  };

  return (
    <div className="product-details-container">
      <Helmet>
        <title>Product Details</title>
        <meta property="og:title" content="ProductDetails - exported project" />
      </Helmet>
      <Header rootClassName="header-root-class-name14"></Header>
      <div className="product-details-container01">
        <div className="product-details-container02">
          <div className="product-details-container03">
            <div className="product-details-container04">
            <Zoom
                img={storedData.imageSource}
                zoomScale={3}
                height={466}
                width={690}
              ></Zoom>
            </div>
          </div>
          <div className="product-details-container05">
          <span className="product-details-text">
              {storedData.catNme} - {storedData.subName}
            </span>
            <h1 className="product-details-text01">{storedData.productName}</h1>
            <span className="product-details-text02">P {storedData.price}</span>
            <div className="product-details-container06">
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
              <span className="product-details-text03">4 review</span>
            </div>
            <div className="product-details-container07">
              <ul className="product-details-ul list">
                <li className="list-item">
                  <span>• Made from Mt. Province fabric</span>
                </li>
                <li className="list-item">
                  <span>
                    • With leather handles and detachable sling strap ;
                    dual-purpose
                  </span>
                </li>
                <li className="list-item">
                  <span>• Lightweight bag</span>
                </li>
                <li className="list-item">
                  <span>• Dimensions: L34 x W13 x H33cm</span>
                </li>
              </ul>
            </div>
            <div className="product-details-container08">
              <span className="product-details-text08">8 in stock</span>
            </div>
            <div className="product-details-container09">
              <div className="product-details-container10">
              <InputSpinner
                  id="quantity"
                  name="quantity"
                  required
                  autoComplete="off"
                  className="product-details-container10"
                  type={"real"}
                  precision={2}
                  min={1}
                  step={1}
                  variant={"light"}
                  onChange={handleChange}
                  value="1"
                />
              </div>
              <button
                className="product-details-button button"
                onClick={handleSubmit}
              >
                ADD TO CART
              </button>
            </div>
            <button
              className="product-details-navlink button"
              onClick={handleSubmit}
            >
              BUY NOW
            </button>
          </div>
        </div>
        <div className="product-details-container11">
          <div className="product-details-container12">
            <div className="product-details-container13">
              <h1 className="product-details-text10">Ratings &amp; Reviews</h1>
              <div className="product-details-container14">
                <div className="product-details-container15">
                  <span className="product-details-text11">Sort:</span>
                  <select className="product-details-select">
                    <option value="Option 1">Relevance</option>
                    <option value="Option 2">Recent</option>
                    <option value="Option 3">Rating: Low to High</option>
                    <option value="Option 4">Rating: High to Low</option>
                  </select>
                </div>
                <div className="product-details-container16">
                  <span className="product-details-text12">Filter:</span>
                  <div
                    data-thq="thq-dropdown"
                    className="product-details-thq-dropdown list-item"
                  >
                    <ul
                      data-thq="thq-dropdown-list"
                      className="product-details-dropdown-list"
                    >
                      <li
                        data-thq="thq-dropdown"
                        className="product-details-dropdown list-item"
                      >
                        <div
                          data-thq="thq-dropdown-toggle"
                          className="product-details-dropdown-toggle"
                        >
                          <span className="product-details-text13">
                            All stars
                          </span>
                        </div>
                      </li>
                      <li
                        data-thq="thq-dropdown"
                        className="product-details-dropdown1 list-item"
                      >
                        <div
                          data-thq="thq-dropdown-toggle"
                          className="product-details-dropdown-toggle1"
                        >
                          <span className="product-details-text14">5 star</span>
                        </div>
                      </li>
                      <li
                        data-thq="thq-dropdown"
                        className="product-details-dropdown2 list-item"
                      >
                        <div
                          data-thq="thq-dropdown-toggle"
                          className="product-details-dropdown-toggle2"
                        >
                          <span className="product-details-text15">4 star</span>
                        </div>
                      </li>
                      <li
                        data-thq="thq-dropdown"
                        className="product-details-dropdown3 list-item"
                      >
                        <div
                          data-thq="thq-dropdown-toggle"
                          className="product-details-dropdown-toggle3"
                        >
                          <span className="product-details-text16">3 star</span>
                        </div>
                      </li>
                      <li
                        data-thq="thq-dropdown"
                        className="product-details-dropdown4 list-item"
                      >
                        <div
                          data-thq="thq-dropdown-toggle"
                          className="product-details-dropdown-toggle4"
                        >
                          <span className="product-details-text17">2 star</span>
                        </div>
                      </li>
                      <li
                        data-thq="thq-dropdown"
                        className="product-details-dropdown5 list-item"
                      >
                        <div
                          data-thq="thq-dropdown-toggle"
                          className="product-details-dropdown-toggle5"
                        >
                          <span className="product-details-text18">1 star</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <select className="product-details-select1">
                    <option value="All stars">All stars</option>
                    <option value="5 star">5 star</option>
                    <option value="3 star">3 star</option>
                    <option value="4 star">4 star</option>
                    <option value="2 star">2 star</option>
                    <option value="1 star">1 star</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="product-details-container17">
              <div className="product-details-container18">
                <div className="product-details-container19">
                  <svg
                    viewBox="0 0 1024 1024"
                    className="product-details-icon14"
                  >
                    <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                  </svg>
                  <svg
                    viewBox="0 0 1024 1024"
                    className="product-details-icon16"
                  >
                    <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                  </svg>
                  <svg
                    viewBox="0 0 1024 1024"
                    className="product-details-icon18"
                  >
                    <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                  </svg>
                  <svg
                    viewBox="0 0 1024 1024"
                    className="product-details-icon20"
                  >
                    <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                  </svg>
                  <svg
                    viewBox="0 0 1024 1024"
                    className="product-details-icon22"
                  >
                    <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                  </svg>
                </div>
                <span className="product-details-text19">October 26, 2022</span>
              </div>
              <div className="product-details-container20">
                <span className="product-details-text20">by Maku</span>
              </div>
              <span className="product-details-text21">
                The product looks and feels very authentic. I just wish they had
                more textile pattern designs.
              </span>
            </div>
            <div className="product-details-container21">
              <div className="product-details-container22">
                <div className="product-details-container23">
                  <svg
                    viewBox="0 0 1024 1024"
                    className="product-details-icon24"
                  >
                    <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                  </svg>
                  <svg
                    viewBox="0 0 1024 1024"
                    className="product-details-icon26"
                  >
                    <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                  </svg>
                  <svg
                    viewBox="0 0 1024 1024"
                    className="product-details-icon28"
                  >
                    <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                  </svg>
                  <svg
                    viewBox="0 0 1024 1024"
                    className="product-details-icon30"
                  >
                    <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                  </svg>
                  <svg
                    viewBox="0 0 1024 1024"
                    className="product-details-icon32"
                  >
                    <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                  </svg>
                </div>
                <span className="product-details-text22">August 16, 2022</span>
              </div>
              <div className="product-details-container24">
                <span className="product-details-text23">by Jerumeru</span>
              </div>
              <span className="product-details-text24">
                Medyo natagalan lang sa pagdeliver pero overall, satisfied naman
                ako sa product na binili ko.
              </span>
            </div>
            <div className="product-details-container25">
              <div className="product-details-container26">
                <div className="product-details-container27">
                  <svg
                    viewBox="0 0 1024 1024"
                    className="product-details-icon34"
                  >
                    <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                  </svg>
                  <svg
                    viewBox="0 0 1024 1024"
                    className="product-details-icon36"
                  >
                    <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                  </svg>
                  <svg
                    viewBox="0 0 1024 1024"
                    className="product-details-icon38"
                  >
                    <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                  </svg>
                  <svg
                    viewBox="0 0 1024 1024"
                    className="product-details-icon40"
                  >
                    <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                  </svg>
                  <svg
                    viewBox="0 0 1024 1024"
                    className="product-details-icon42"
                  >
                    <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                  </svg>
                </div>
                <span className="product-details-text25">October 11, 2022</span>
              </div>
              <div className="product-details-container28">
                <span className="product-details-text26">by Shina</span>
              </div>
              <span className="product-details-text27">
                Inabel Ni Ina always provides authentic and beautiful products.
                I hope to buy more from them! 
              </span>
            </div>
            <div className="product-details-container29">
              <div className="product-details-container30">
                <div className="product-details-container31">
                  <svg
                    viewBox="0 0 1024 1024"
                    className="product-details-icon44"
                  >
                    <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                  </svg>
                  <svg
                    viewBox="0 0 1024 1024"
                    className="product-details-icon46"
                  >
                    <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                  </svg>
                  <svg
                    viewBox="0 0 1024 1024"
                    className="product-details-icon48"
                  >
                    <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                  </svg>
                  <svg
                    viewBox="0 0 1024 1024"
                    className="product-details-icon50"
                  >
                    <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                  </svg>
                  <svg
                    viewBox="0 0 1024 1024"
                    className="product-details-icon52"
                  >
                    <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                  </svg>
                </div>
                <span className="product-details-text28">
                  September 09, 2022
                </span>
              </div>
              <div className="product-details-container32">
                <span className="product-details-text29">by Rui</span>
              </div>
              <span className="product-details-text30">
                Sobrang ganda nung bag!!! Bili na rin kayoo hehe
              </span>
            </div>
          </div>
          <Link to="/shop" className="product-details-navlink1 button">
            BACK TO SHOP
          </Link>
        </div>
      </div>
      <Footer rootClassName="footer-root-class-name14"></Footer>
    </div>
  )
}

export default ProductDetails
