import React from 'react'

import { Helmet } from 'react-helmet'

import '../../update/css/update-attribute.css'

const AdminAddAttributes = (props) => {
  return (
    <div className="update-attributes-container">
      <Helmet>
        <title>adminAddAttributes - exported project</title>
        <meta
          property="og:title"
          content="adminAddAttributes - exported project"
        />
      </Helmet>
      <div className="update-attributes-container1">
        <h1 className="update-attributes-text">
          <span className="update-attributes-text01">Attribute Name</span>
          <br></br>
        </h1>
        <form className="update-attributes-form">
          <div className="update-attributes-container2">
            <div className="update-attributes-container3">
              <label htmlFor="attributevalue">Attribute Value</label>
              <input
                type="text"
                id="attributevalue"
                required
                placeholder="ex: Small"
                className="update-attributes-textinput input"
              />
            </div>
            
         </div>
          <div className="update-attributes-container5">
            <div className="update-attributes-container6">
              <div className="update-attributes-container7">
                <button
                  name="cancel"
                  type="button"
                  className="update-attributes-button1 button"
                  onClick = {props.handleClose}
                >
                  Cancel
                </button>
              </div>
              <div className="update-attributes-container8">
                <button
                  name="updateAttribute"
                  type="submit"
                  className="update-attributes-button2 button"
                >
                  <span className="update-attributes-text08">
                    <span>
                      Update
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                    <br></br>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminAddAttributes
