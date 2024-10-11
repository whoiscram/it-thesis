import React from 'react'

import PropTypes from 'prop-types'

import './action-edit-button.css'

const ActionEditButton = (props) => {
  return (
    <div className={`action-edit-button-container ${props.rootClassName} `}>
      <button
        name="edit"
        type="button"
        className="action-edit-button-edit-button button"
      >
        {props.editButton}
      </button>
    </div>
  )
}

ActionEditButton.defaultProps = {
  editButton: 'Edit\n',
  rootClassName: '',
}

ActionEditButton.propTypes = {
  editButton: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default ActionEditButton
