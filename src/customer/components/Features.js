import React from "react";

import PropTypes from "prop-types";

import "./features.css";

const Features = (props) => {
  return (
    <header className={`features-testimonial-card ${props.rootClassName} `}>
      <img
        alt={props.image_alt}
        src={props.image_src}
        className="features-image"
      />
      <h1 className="features-text">{props.heading}</h1>
      <div className="features-testimonial">
        <span className="features-text1">{props.quote}</span>
      </div>
    </header>
  );
};

Features.defaultProps = {
  image_alt: "image",
  rootClassName: "",
  quote:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lorem lorem, malesuada in metus vitae, scelerisque accumsan ipsum.  Nam pellentesque nulla leo, sagittis vehicula sem commodo nec.",
  heading: "Authenticity",
  image_src: "aaddcce1-2c55-4a63-b911-224deef5ea0a",
};

Features.propTypes = {
  image_alt: PropTypes.string,
  rootClassName: PropTypes.string,
  quote: PropTypes.string,
  heading: PropTypes.string,
  image_src: PropTypes.string,
};

export default Features;
