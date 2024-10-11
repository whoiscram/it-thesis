import React from 'react'

import PropTypes from 'prop-types'

import './gallery.css'

const Gallery = (props) => {
  return (
    <div className={`gallery-gallery-card ${props.rootClassName} `}>
      <img
        alt={props.image_alt}
        src={props.image_src}
        className="gallery-image"
      />
      <div className="gallery-container">
        <span className="gallery-text">{props.Title}</span>
      </div>
    </div>
  )
}

Gallery.defaultProps = {
  Title: 'Inabel Ni Ina',
  rootClassName: '',
  image_src:
    'https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDF8fG1pbmltYWxpc20lMjBjb3VjaHxlbnwwfHx8fDE2MjY0NDg1NTk&ixlib=rb-1.2.1&h=1000',
  image_alt: 'image',
}

Gallery.propTypes = {
  Title: PropTypes.string,
  rootClassName: PropTypes.string,
  image_src: PropTypes.string,
  image_alt: PropTypes.string,
}

export default Gallery
