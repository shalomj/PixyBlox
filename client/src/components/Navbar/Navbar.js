import React from 'react';
import logo from '../../assets/images/logo.svg';

/**
 * Component for the navigation bar
 */
const Navbar = () => {
  return (
    <nav className="navbar fixed-top navbar-light shadow" id="navbar">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img src={logo} width="30" height="30" alt="PixyBlox - Photo Tile Maker" loading="lazy" />
          <span id="navbar-title">PixyBlox</span>
        </a>
      </div>
    </nav>
  )
};

export default Navbar;