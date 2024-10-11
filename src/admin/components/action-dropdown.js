import React from 'react'

import PropTypes from 'prop-types'

import './action-dropdown.css'

const ActionDropdown = (props) => {
  return (
    <div className={`action-dropdown-container ${props.rootClassName} `}>
      <select name="actionDropdown" className="action-dropdown-action-dropdown">
        <option value="view" selected>
          View
        </option>
        <option value="edit">Edit</option>
        <option value="delete">Delete</option>
      </select>
    </div>
  )
}

ActionDropdown.defaultProps = {
  rootClassName: '',
}

ActionDropdown.propTypes = {
  rootClassName: PropTypes.string,
}

export default ActionDropdown
