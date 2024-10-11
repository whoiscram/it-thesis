import React from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import '../css/measuring-guide.css'

const MeasuringGuide = (props) => {
  return (
    <div className="measuring-guide-container">
      <Helmet>
        <title>MeasuringGuide - exported project</title>
        <meta property="og:title" content="MeasuringGuide - exported project" />
      </Helmet>
      <Header rootClassName="header-root-class-name10"></Header>
      <div className="measuring-guide-container01">
        <h1 className="measuring-guide-text">MEASURING GUIDE CHART</h1>
        <div className="measuring-guide-container02">
          <div className="measuring-guide-container03">
            <div className="measuring-guide-container04">
              <img
                alt="image"
                src="/playground_assets/bust-300h.png"
                className="measuring-guide-image"
              />
              <h2 className="measuring-guide-text01">Bust</h2>
            </div>
            <div className="measuring-guide-container05">
              <img
                alt="image"
                src="/playground_assets/waist-300w.png"
                className="measuring-guide-image01"
              />
              <h2 className="measuring-guide-text02">Waist</h2>
            </div>
            <div className="measuring-guide-container06">
              <img
                alt="image"
                src="/playground_assets/hips-300h.png"
                className="measuring-guide-image02"
              />
              <h2 className="measuring-guide-text03">Hips</h2>
            </div>
            <div className="measuring-guide-container07">
              <img
                alt="image"
                src="/playground_assets/backwidth-300w.png"
                className="measuring-guide-image03"
              />
              <h2 className="measuring-guide-text04">Back Width</h2>
            </div>
            <div className="measuring-guide-container08">
              <img
                alt="image"
                src="/playground_assets/frontchest-300w.png"
                className="measuring-guide-image04"
              />
              <h2 className="measuring-guide-text05">Front Chest</h2>
            </div>
          </div>
          <div className="measuring-guide-container09">
            <div className="measuring-guide-container10">
              <img
                alt="image"
                src="/playground_assets/shoulder-300h.png"
                className="measuring-guide-image05"
              />
              <h2 className="measuring-guide-text06">Shoulder</h2>
            </div>
            <div className="measuring-guide-container11">
              <img
                alt="image"
                src="/playground_assets/underbust-300h.png"
                className="measuring-guide-image06"
              />
              <h2 className="measuring-guide-text07">Under Bust</h2>
            </div>
            <div className="measuring-guide-container12">
              <img
                alt="image"
                src="/playground_assets/upperarm-300h.png"
                className="measuring-guide-image07"
              />
              <h2 className="measuring-guide-text08">Upper Arm</h2>
            </div>
            <div className="measuring-guide-container13">
              <img
                alt="image"
                src="/playground_assets/frontshouldertowaist-300h.png"
                className="measuring-guide-image08"
              />
              <h2 className="measuring-guide-text09">
                Front Shoulder to Waist
              </h2>
            </div>
            <div className="measuring-guide-container14">
              <img
                alt="image"
                src="/playground_assets/outsideleg-300w.png"
                className="measuring-guide-image09"
              />
              <h2 className="measuring-guide-text10">Skirt Length</h2>
            </div>
          </div>
        </div>
        <div className="measuring-guide-container15">
          <Link to="/customize" className="measuring-guide-navlink button">
            GO BACK
          </Link>
        </div>
      </div>
      <Footer rootClassName="footer-root-class-name10"></Footer>
    </div>
  )
}

export default MeasuringGuide
