import React from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import '../css/custom-summary.css'

const CustomSummary = (props) => {
  return (
    <div className="custom-summary-container">
      <Helmet>
        <title>Customized Order Summary</title>
        <meta property="og:title" content="CustomSummary - exported project" />
      </Helmet>
      <Header rootClassName="header-root-class-name10"></Header>
      <div className="custom-summary-container01">
        <h1 className="custom-summary-text">SUMMARY</h1>
        <div className="custom-summary-container02">
          <div className="custom-summary-container03">
            <h1 className="custom-summary-text01">STEP 1:</h1>
            <h1 className="custom-summary-text02">Choose Type of Clothing</h1>
            <span className="custom-summary-text03">Filipiniana</span>
          </div>
          <div className="custom-summary-container04">
            <h1 className="custom-summary-text04">STEP 2:</h1>
            <h1 className="custom-summary-text05">Input Body Measurements</h1>
            <div className="custom-summary-container05">
              <div className="custom-summary-container06">
                <label className="custom-summary-text06">Bust:</label>
                <span className="custom-summary-text07">26 cm</span>
              </div>
              <div className="custom-summary-container07">
                <label className="custom-summary-text08">Waist:</label>
                <span className="custom-summary-text09">15 cm</span>
              </div>
              <div className="custom-summary-container08">
                <label className="custom-summary-text10">Hips:</label>
                <span className="custom-summary-text11">0 cm</span>
              </div>
              <div className="custom-summary-container09">
                <label className="custom-summary-text12">Back Width: </label>
                <span className="custom-summary-text13">40 cm</span>
              </div>
              <div className="custom-summary-container10">
                <label className="custom-summary-text14">Front Chest:</label>
                <span className="custom-summary-text15">40 cm</span>
              </div>
              <div className="custom-summary-container11">
                <label className="custom-summary-text16">Shoulder:</label>
                <span className="custom-summary-text17">40 cm</span>
              </div>
              <div className="custom-summary-container12">
                <label className="custom-summary-text18">Under Bust:</label>
                <span className="custom-summary-text19">40 cm</span>
              </div>
              <div className="custom-summary-container13">
                <label className="custom-summary-text20">Upper Arm:</label>
                <span className="custom-summary-text21">40 cm</span>
              </div>
              <div className="custom-summary-container14">
                <label className="custom-summary-text22">
                  Front Shoulder to Waist:
                </label>
                <span className="custom-summary-text23">40 cm</span>
              </div>
              <div className="custom-summary-container15">
                <label className="custom-summary-text24">Skirt Length:</label>
                <span className="custom-summary-text25">0 cm</span>
              </div>
            </div>
          </div>
          <div className="custom-summary-container16">
            <h1 className="custom-summary-text26">STEP 3:</h1>
            <h1 className="custom-summary-text27">Specify Textile Pattern</h1>
            <div className="custom-summary-container17">
              <img
                alt="image"
                src="/playground_assets/textile2-200w.png"
                className="custom-summary-image"
              />
            </div>
          </div>
          <div className="custom-summary-container18">
            <h1 className="custom-summary-text28">Additional Comments:</h1>
            <span className="custom-summary-text29">
              Exact measurements po yung kinuha ko.
            </span>
          </div>
        </div>
        <div className="custom-summary-container19">
          <Link to="/customize" className="custom-summary-navlink button">
            EDIT
          </Link>
          <button className="custom-summary-button button">PLACE ORDER</button>
        </div>
      </div>
      <Footer rootClassName="footer-root-class-name10"></Footer>
    </div>
  )
}

export default CustomSummary
