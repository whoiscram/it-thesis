import React from 'react'

import PropTypes from 'prop-types'

import './action-save-button.css'

const ActionSaveButton = (props) => {
  return (
    <div className={`action-save-button-container ${props.rootClassName} `}>
      <button
        name="saveProduct"
        type="submit"
        className="action-save-button-button button"
      >
        <span className="">
          <span className="">
            Save
            <span
              dangerouslySetInnerHTML={{
                __html: ' ',
              }}
            />
          </span>
          <br className=""></br>
        </span>
      </button>
    </div>
  )
}

ActionSaveButton.defaultProps = {
  rootClassName: '',
}

ActionSaveButton.propTypes = {
  rootClassName: PropTypes.string,
}

export default ActionSaveButton
