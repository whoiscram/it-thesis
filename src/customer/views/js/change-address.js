import React from 'react'

import { Helmet } from 'react-helmet'

import './change-address.css'

const ChangeAddress = (props) => {
  return (
    <div className="change-address-container">
      <Helmet>
        <title>ChangeAddress - exported project</title>
        <meta property="og:title" content="ChangeAddress - exported project" />
      </Helmet>
      <div className="change-address-change-address">
        <label
          htmlFor="productdescription"
          className="change-address-delivery-address"
        >
          <span>Delivery Address</span>
          <br></br>
        </label>
        <div className="change-address-container01">
          <div className="change-address-container02">
            <label htmlFor="price">
              <span>Region</span>
              <br></br>
            </label>
            <select className="change-address-region">
              <option value="ncr">NCR</option>
              <option value="r1">Option 2</option>
              <option value="Option 3">Option 3</option>
            </select>
          </div>
        </div>
        <div className="change-address-container03">
          <div className="change-address-container04">
            <label htmlFor="stock" className="change-address-province-label">
              <span>Province</span>
              <br></br>
            </label>
            <select className="change-address-province">
              <option value="manila">Manila</option>
              <option value="baguio">Baguio</option>
              <option value="Option 3">Option 3</option>
            </select>
          </div>
          <div className="change-address-container05">
            <label htmlFor="price">
              <span>City</span>
              <br></br>
            </label>
            <select className="change-address-city">
              <option value="qc">Quezon City</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </select>
          </div>
          <div className="change-address-container06">
            <label htmlFor="stock" className="change-address-postal-label">
              <span>Postal Code</span>
              <br></br>
            </label>
            <input
              type="number"
              name="stock"
              required
              placeholder="1800"
              className="change-address-postal-input input"
            />
          </div>
        </div>
        <div className="change-address-container07">
          <div className="change-address-container08">
            <label htmlFor="sku" className="change-address-barangay-label">
              <span>Barangay</span>
              <br></br>
            </label>
            <select className="change-address-barangay">
              <option value="manila">Manila</option>
              <option value="baguio">Baguio</option>
              <option value="Option 3">Option 3</option>
            </select>
          </div>
          <div className="change-address-container09">
            <label htmlFor="price">
              <span>Street</span>
              <br></br>
            </label>
            <input
              type="text"
              placeholder="Acacia St"
              className="change-address-street input"
            />
          </div>
          <div className="change-address-container10">
            <label htmlFor="stock" className="change-address-house-no-label">
              <span>House No.</span>
              <br></br>
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              required
              placeholder="362"
              className="change-address-house-no input"
            />
          </div>
        </div>
        <div className="change-address-container11">
          <button className="change-address-button button">Cancel</button>
          <button className="change-address-button1 button">Confirm</button>
        </div>
      </div>
    </div>
  )
}

export default ChangeAddress
