import React from 'react'

import { Helmet } from 'react-helmet'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import '../css/contact-us.css'

const ContactUs = (props) => {
  return (
    <div className="contact-us-container">
      <Helmet>
        <title>Contact Ust</title>
        <meta property="og:title" content="Contact-Us - exported project" />
      </Helmet>
      <Header rootClassName="header-root-class-name4"></Header>
      <div className="contact-us-container1">
        <div className="contact-us-container2">
          <h1 className="contact-us-text">Get in Touch</h1>
          <span className="contact-us-text01">
            <span>Questions? Comments?</span>
            <br></br>
            <br></br>
            <span>
              Let us know by giving us a text or a call using the phone
            </span>
            <br></br>
            <span>number below. </span>
            <span>We will get back to you as soon as possible.</span>
          </span>
          <div className="contact-us-container3">
            <svg viewBox="0 0 1024 1024" className="contact-us-icon">
              <path d="M704 640c-64 64-64 128-128 128s-128-64-192-128-128-128-128-192 64-64 128-128-128-256-192-256-192 192-192 192c0 128 131.5 387.5 256 512s384 256 512 256c0 0 192-128 192-192s-192-256-256-192z"></path>
            </svg>
            <span className="contact-us-text09"> +639484177978</span>
          </div>
          <span className="contact-us-text10">
            <span>Find us also in:</span>
            <br className="contact-us-text12"></br>
            <span className="contact-us-text13">Sunday Market Showcase</span>
            <br className="contact-us-text14"></br>
            <span className="contact-us-text15">at Session Road, </span>
            <span className="contact-us-text16">Baguio City</span>
            <br className="contact-us-text17"></br>
            <br></br>
            <span>Hope to see you there!</span>
          </span>
        </div>
        <img
          alt="image"
          src="/playground_assets/mandekokitobanner-1500w.png"
          className="contact-us-image"
        />
      </div>
      <Footer rootClassName="footer-root-class-name7"></Footer>
    </div>
  )
}

export default ContactUs
