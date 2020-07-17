import React, { Component } from "react";
// import LandingImg from "../landing.jpg";
import {Link} from 'react-router-dom'

export default class Homepage extends Component {
  render() {
    return (
      <section id="banner" className="hero">
        <div className='hero-image'>
            <div className="hero-text">
            <h1 className='display-4'>Shop your favorite Gadgets</h1>
            <p className='lead'>A great place to buy.</p>
            <button className='btn btn-rounded landing-btn'>
                <Link to='/products'>Go to products</Link>
            </button>
            </div>
        </div>
      </section>
    );
  }
}


