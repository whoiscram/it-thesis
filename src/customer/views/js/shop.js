import React from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../css/shop.css";
import CardList from "../../components/CardList";

const Shop = (props) => {
  return (
    <div className="shop-container">
      <Helmet>
        <title>Shop</title>
        <meta property="og:title" content="Inabel ni Ina Shop" />
      </Helmet>
      <Header rootClassName="header-root-class-name9"></Header>
      <CardList />
      <div className="shop-container18">
        <svg viewBox="0 0 1024 1024" className="shop-icon64">
          <path d="M658 708l-60 60-256-256 256-256 60 60-196 196z"></path>
        </svg>
        <span className="shop-text22">1</span>
        <span className="shop-text23">2</span>
        <span className="shop-text24">
          <span>3</span>
          <br></br>
        </span>
        <svg viewBox="0 0 1024 1024" className="shop-icon66">
          <path d="M366 708l196-196-196-196 60-60 256 256-256 256z"></path>
        </svg>
      </div>
      <Footer rootClassName="footer-root-class-name9"></Footer>
    </div>
  );
};

export default Shop;
