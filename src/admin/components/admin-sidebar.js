import React from 'react'

import PropTypes from 'prop-types'

import './admin-sidebar.css'

const AdminSidebar = (props) => {
  return (
    <div className={`admin-sidebar ${props.rootClassName} `}>
      <nav className="sidebar-nav">
        <svg viewBox="0 0 1024 1024" className="sidebar-icon">
          <path
            d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"
            className=""
          ></path>
        </svg>
        <span  className="sidebar-dashboard-text">{props.dashboard}</span>
        <span  className="sidebar-product-text">{props.products}</span>
        <span  className="sidebar-categories-text">{props.categories}</span>
        <span  className="sidebar-attributes-text">{props.attributes} </span>
        <span  className="sidebar-orders-text">{props.orders}</span>
        <span  className="">{props.users}</span>
      </nav>
      <div className="sidebar-profile">
        <img
          alt={props.image_alt}
          src={props.imageProfileSrc}
          className="sidebar-image"
        />
        <div className="sidebar-container">
          <span className="sidebar-text">{props.userName}</span>
          <span className="sidebar-text1">{props.viewProfile}</span>
        </div>
      </div>
    </div>
  )
}

AdminSidebar.defaultProps = {
  products: 'Products',
  dashboard: 'Dashboard',
  categories: 'Categories',
  imageProfileSrc:
    'https://images.unsplash.com/photo-1562159278-1253a58da141?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDIyfHxtYW4lMjBwb3J0dHJhaXR8ZW58MHx8fHwxNjI3MjkzNTM1&ixlib=rb-1.2.1&w=200',
  orders: 'Orders',
  image_alt: 'image',
  userName: 'John Doe',
  viewProfile: 'View Profile',
  users: 'Users',
  attributes: 'Attributes',
  rootClassName: '',
}

AdminSidebar.propTypes = {
  products: PropTypes.string,
  dashboard: PropTypes.string,
  categories: PropTypes.string,
  imageProfileSrc: PropTypes.string,
  orders: PropTypes.string,
  image_alt: PropTypes.string,
  userName: PropTypes.string,
  viewProfile: PropTypes.string,
  users: PropTypes.string,
  attributes: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default AdminSidebar
