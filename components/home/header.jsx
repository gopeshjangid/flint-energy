import React, { Component } from 'react'
import Carousel from "react-multi-carousel";
import Image from  "next/image";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 3500, min: 3000 },
    items: 2,
    partialVisibilityGutter: 40,
  },
  desktop: {
    breakpoint: { max: 1800, min: 1024 },
    items: 1,
    partialVisibilityGutter: 40
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export class Header extends Component {
  render() {
    return (
      <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div  className="col-md-12 col-xs-12">
               <img src="/images/portfolio/portfolio.jpg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    );
  }
}

export default Header;
