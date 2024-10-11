import React from 'react'

import PropTypes from 'prop-types'

import './action-delete-button.css'

const ActionDeleteButton = (props) => {
  return (
    <div className={`action-delete-button-container ${props.rootClassName} `}>
      <button
        name="deleteProduct"
        className="action-delete-button-delete-product-button button"
      >
        {props.deleteProductButton}
      </button>
    </div>
  )
}

ActionDeleteButton.defaultProps = {
  rootClassName: '',
  deleteProductButton: 'Delete',
}

ActionDeleteButton.propTypes = {
  rootClassName: PropTypes.string,
  deleteProductButton: PropTypes.string,
}

export default ActionDeleteButton
