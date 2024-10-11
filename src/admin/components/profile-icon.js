import React from 'react'

import PropTypes from 'prop-types'

import './profile-icon.css'

const ProfileIcon = (props) => {
  return (
    <div className={`profile-icon-akariconsperson ${props.rootClassName} `}>
      <div className="profile-icon-group">
        <img
          alt={props.Vector_alt}
          src={props.Vector_src}
          className="profile-icon-vector"
        />
        <img
          alt={props.Vector_alt1}
          src={props.Vector_src1}
          className="profile-icon-vector1"
        />
      </div>
    </div>
  )
}

ProfileIcon.defaultProps = {
  Vector_src1: '/playground_assets/vector5501-d36.svg',
  Vector_alt1: 'Vector5501',
  Vector_alt: 'Vector5501',
  rootClassName: '',
  Vector_src: '/playground_assets/vector5501-zca.svg',
}

ProfileIcon.propTypes = {
  Vector_src1: PropTypes.string,
  Vector_alt1: PropTypes.string,
  Vector_alt: PropTypes.string,
  rootClassName: PropTypes.string,
  Vector_src: PropTypes.string,
}

export default ProfileIcon
