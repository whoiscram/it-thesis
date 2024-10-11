import React from 'react'

import PropTypes from 'prop-types'

import './profile-icon.css'

const ProfileIcon = (props) => {
  return (
    <div className={`profile-icon-akariconsperson ${props.rootClassName} `}>
      <div className="profile-icon-group">
        <img
          alt={props.Vector_alt}
          src="https://play.teleporthq.io/static/svg/placeholders/no-image.svg"
          className="profile-icon-vector"
        />
        <img
          alt={props.Vector_alt1}
          src="https://play.teleporthq.io/static/svg/placeholders/no-image.svg"
          className="profile-icon-vector1"
        />
      </div>
    </div>
  )
}

ProfileIcon.defaultProps = {
  Vector_src1:
    'https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/af9c79a7-771c-4dab-889c-d4aa1c8350cf/041f3643-3fa1-466f-a58c-3bfcde462e9c?org_if_sml=1839',
  Vector_alt1: 'Vector5501',
  Vector_alt: 'Vector5501',
  rootClassName: '',
  Vector_src:
    'https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/af9c79a7-771c-4dab-889c-d4aa1c8350cf/7e37e85a-5464-4da1-9465-8bacd8206444?org_if_sml=1296',
}

ProfileIcon.propTypes = {
  Vector_src1: PropTypes.string,
  Vector_alt1: PropTypes.string,
  Vector_alt: PropTypes.string,
  rootClassName: PropTypes.string,
  Vector_src: PropTypes.string,
}

export default ProfileIcon
