import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Helmet } from "react-helmet";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../css/customize.css";

const Customize = (props) => {
  const [inputs, setInputs] = useState({});
  const [selectedValue, setSelectedValue] = useState("");
  const [showTopDiv, setShowTopDiv] = useState(false);
  const [showSkirtDiv, setShowSkirtDiv] = useState(false); //

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (event.target.value === "Pencil Skirt") {
      setShowSkirtDiv(true);
      setShowTopDiv(false);
    } else {
      setShowTopDiv(true);
      setShowSkirtDiv(false);
    }
  };

  const handleMeasurement = (event) => {
    const [inputs, setInputs] = useState({});
  };
  return (
    <div className="customize-container">
      <Helmet>
        <title>Customize - exported project</title>
        <meta property="og:title" content="Customize - exported project" />
      </Helmet>
      <Header rootClassName="header-root-class-name10"></Header>
      <div className="customize-container01">
        <h1 className="customize-text">CUSTOMIZE</h1>
        <div className="customize-container02">
          <div className="customize-container03">
            <h1 className="customize-text01">STEP 1:</h1>
            <h1 className="customize-text02">Choose Product</h1>
            <div className="customize-container04">
              <label className="customize-text03">Type of Clothing:</label>
              <select className="customize-select" onChange={handleChange}>
                <option value="Filipiniana">Filipiniana</option>
                <option value="Puff Blouse">Puff Blouse</option>
                <option value="Topper">Topper</option>
                <option value="Pencil Skirt">Pencil Skirt</option>
              </select>
            </div>
          </div>
          <div className="customize-container05">
            <h1 className="customize-text04">STEP 2:</h1>
            <h1 className="customize-text05">Input Body Measurements</h1>
            <div className="customize-container06">
              <Link to="/measuring-guide" className="customize-navlink">
                Measuring Guide Chart
              </Link>
            </div>
            <div className="customize-container07">
              {showTopDiv && (
                <div>
                  <div className="customize-container08">
                    <label className="customize-text06">Bust:</label>
                    <div className="customize-container09">
                      <input
                        type="number"
                        onChange={handleMeasurement}
                        placeholder="0"
                        className="customize-textinput input"
                      />
                      <label className="customize-text07">cm</label>
                    </div>
                  </div>
                  <div className="customize-container10">
                    <label className="customize-text08">Waist:</label>
                    <div className="customize-container11">
                      <input
                        type="number"
                        onChange={handleMeasurement}
                        placeholder="0"
                        className="customize-textinput01 input"
                      />
                      <label className="customize-text09">cm</label>
                    </div>
                  </div>
                  <div className="customize-container14">
                    <label className="customize-text12">Back Width:</label>
                    <div className="customize-container15">
                      <input
                        type="number"
                        onChange={handleMeasurement}
                        placeholder="0"
                        className="customize-textinput03 input"
                      />
                      <label className="customize-text13">cm</label>
                    </div>
                  </div>
                  <div className="customize-container16">
                    <label className="customize-text14">Front Chest:</label>
                    <div className="customize-container17">
                      <input
                        type="number"
                        onChange={handleMeasurement}
                        placeholder="0"
                        className="customize-textinput04 input"
                      />
                      <label className="customize-text15">cm</label>
                    </div>
                  </div>
                  <div className="customize-container18">
                    <label className="customize-text16">Shoulder:</label>
                    <div className="customize-container19">
                      <input
                        type="number"
                        onChange={handleMeasurement}
                        placeholder="0"
                        className="customize-textinput05 input"
                      />
                      <label className="customize-text17">cm</label>
                    </div>
                  </div>
                  <div className="customize-container20">
                    <label className="customize-text18">Under Bust:</label>
                    <div className="customize-container21">
                      <input
                        type="number"
                        onChange={handleMeasurement}
                        placeholder="0"
                        className="customize-textinput06 input"
                      />
                      <label className="customize-text19">cm</label>
                    </div>
                  </div>
                  <div className="customize-container22">
                    <label className="customize-text20">
                      <span>Upper Arm:</span>
                      <br></br>
                    </label>
                    <div className="customize-container23">
                      <input
                        type="number"
                        onChange={handleMeasurement}
                        placeholder="0"
                        className="customize-textinput07 input"
                      />
                      <label className="customize-text23">cm</label>
                    </div>
                  </div>
                </div>
              )}

              {showSkirtDiv && (
                <div>
                  <div className="customize-container12">
                    <label className="customize-text10">Hips:</label>
                    <div className="customize-container13">
                      <input
                        type="number"
                        onChange={handleMeasurement}
                        placeholder="0"
                        className="customize-textinput02 input"
                      />
                      <label className="customize-text11">cm</label>
                    </div>
                  </div>
                  <div className="customize-container10">
                    <label className="customize-text08">Waist:</label>
                    <div className="customize-container11">
                      <input
                        type="number"
                        onChange={handleMeasurement}
                        placeholder="0"
                        className="customize-textinput01 input"
                      />
                      <label className="customize-text09">cm</label>
                    </div>
                  </div>
                  <div className="customize-container26">
                    <label className="customize-text26">Skirt Length:</label>
                    <div className="customize-container27">
                      <input
                        type="number"
                        onChange={handleMeasurement}
                        placeholder="0"
                        className="customize-textinput09 input"
                      />
                      <label className="customize-text27">cm</label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="customize-container28">
            <h1 className="customize-text28">STEP 3:</h1>
            <h1 className="customize-text29">Specify Textile Pattern</h1>
            <div className="customize-container29">
              <img
                alt="image"
                src="/playground_assets/textile1-200w.png"
                className="customize-image"
              />
              <img
                alt="image"
                src="/playground_assets/textile2-200w.png"
                className="customize-image1"
              />
              <img
                alt="image"
                src="/playground_assets/textile3-200w.png"
                className="customize-image2"
              />
              <img
                alt="image"
                src="/playground_assets/textile4-200w.png"
                className="customize-image3"
              />
              <img
                alt="image"
                src="/playground_assets/textile5-200w.png"
                className="customize-image4"
              />
              <img
                alt="image"
                src="/playground_assets/textile6-200w.png"
                className="customize-image5"
              />
            </div>
            <span className="customize-text30">or</span>
            <div className="customize-container30">
              <svg viewBox="0 0 1024 1024" className="customize-icon">
                <path d="M598 554h128l-214-212-214 212h128v172h172v-172zM826 428q82 6 140 67t58 145q0 88-63 151t-151 63h-554q-106 0-181-75t-75-181q0-94 67-169t161-85q42-78 118-126t166-48q108 0 201 76t113 182z"></path>
              </svg>
              <span className="customize-text31">Upload an image...</span>
            </div>
          </div>
          <div className="customize-container31">
            <h1 className="customize-text32">Additional Comments:</h1>
            <textarea
              placeholder="Type your comment here..."
              className="customize-textarea textarea"
            ></textarea>
          </div>
        </div>
        <div className="customize-container32">
          <button className="customize-button button">CANCEL</button>
          <Link to="/custom-summary" className="customize-navlink1 button">
            CONTINUE
          </Link>
        </div>
      </div>
      <Footer rootClassName="footer-root-class-name10"></Footer>
    </div>
  );
};

export default Customize;
