import React from 'react'

import PropTypes from 'prop-types'

import './action-view-button.css'

const ActionViewButton = (props) => {
  return (
    <div className={`action-view-button-container ${props.rootClassName} `}>
      <button
        name="viewProduct"
        className="action-view-button-view-product-button button"
      >
        {props.viewProductButton}
      </button>
    </div>
  )
}

ActionViewButton.defaultProps = {
  viewProductButton: 'View',
  rootClassName: '',
}

ActionViewButton.propTypes = {
  viewProductButton: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default ActionViewButton
