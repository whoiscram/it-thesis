import React from 'react'

import PropTypes from 'prop-types'

import './action-cancel-button.css'

const ActionCancelButton = (props) => {
  return (
    <div className={`action-cancel-button-container ${props.rootClassName} `}>
      <button
        name="saveProduct"
        type="submit"
        className="action-cancel-button-button button"
      >
        {props.button}
      </button>
    </div>
  )
}

ActionCancelButton.defaultProps = {
  button: 'Cancel',
  rootClassName: '',
}

ActionCancelButton.propTypes = {
  button: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default ActionCancelButton
