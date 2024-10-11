import React from 'react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import './navigation-links.css'

const NavigationLinks = (props) => {
  return (
    <nav className={`navigation-links-nav ${props.rootClassName} `}>
      <Link to="/" className="navigation-links-navlink">
        {props.text}
      </Link>
      <Link to="/shop" className="navigation-links-navlink1">
        {props.text1}
      </Link>
      <Link to="/customize" className="navigation-links-navlink2">
        {props.text2}
      </Link>
      <Link to="/our-story" className="navigation-links-navlink3">
        {props.text3}
      </Link>
      <Link to="/faqs" className="navigation-links-navlink4">
        {props.text4}
      </Link>
    </nav>
  )
}

NavigationLinks.defaultProps = {
  text: 'Home',
  text2: 'Customize',
  text4: 'FAQs',
  text3: 'Our Story',
  text1: 'Shop',
  rootClassName: '',
}

NavigationLinks.propTypes = {
  text: PropTypes.string,
  text2: PropTypes.string,
  text4: PropTypes.string,
  text3: PropTypes.string,
  text1: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default NavigationLinks
