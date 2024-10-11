import React from 'react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import './footer.css'

const Footer = (props) => {
  return (
    <div className={`footer-container ${props.rootClassName} `}>
      <footer className="footer-footer">
        <div className="footer-container1">
          <div className="footer-logo">
            <div className="footer-container2">
              <img
                alt="logo"
                src="/playground_assets/footerlogo-1500h.png"
                className="footer-image"
              />
            </div>
            <span className="footer-text">
              <span className="">
                Inabel ni Ina is a manufacturing company 
              </span>
              <span className="">focused </span>
              <span className="">on handwoven textiles, mainly from </span>
              <span className="">
                Cordillera, to make products such as clothing, 
              </span>
              <span className="">
                bags, pouches, accessories, and many more.
              </span>
              <span className="">
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <span className="">
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
            </span>
          </div>
          <div className="footer-links-container">
            <div className="footer-container3">
              <div className="footer-product-container">
                <span className="footer-text08">Shop</span>
                <Link to="/shop" className="footer-navlink">
                  Men
                </Link>
                <Link to="/shop" className="footer-navlink1">
                  Women
                </Link>
                <Link to="/shop" className="footer-navlink2">
                  Bags &amp; Pouches
                </Link>
                <Link to="/shop" className="footer-navlink3">
                  Accessories
                </Link>
              </div>
              <div className="footer-company-container">
                <span className="footer-text09">Quick Links</span>
                <Link to="/our-story" className="footer-navlink4">
                  <span className="">
                    Our
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                  <span className="">Story</span>
                </Link>
                <Link to="/contact-us" className="footer-navlink5">
                  <span className="">
                    Contact
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                  <span className="">Us</span>
                </Link>
              </div>
            </div>
            <div className="footer-container4">
              <div className="footer-socials">
                <span className="footer-text14">Connect With Us</span>
                <div className="footer-icon-group">
                  <a
                    href="https://www.facebook.com/inabelNIina/?ref=page_internal"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="footer-link"
                  >
                    <svg
                      viewBox="0 0 602.2582857142856 1024"
                      className="footer-icon"
                    >
                      <path
                        d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"
                        className=""
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-separator"></div>
        <span className="footer-text15">
          © 2022 Inabel ni Ina | Support Local
        </span>
      </footer>
    </div>
  )
}

Footer.defaultProps = {
  rootClassName: '',
}

Footer.propTypes = {
  rootClassName: PropTypes.string,
}

export default Footer
