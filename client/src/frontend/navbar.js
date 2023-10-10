import React from 'react';
import './style.css'; 

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1><span className="auto">Auto</span><span className="connect">Connect</span></h1>
      </div>
      <div className="navbar-right">
        <ul className="navbar-links">
          <li><a href="#" className="nav-link">Home</a></li>
          <li><a href="#" className="nav-link">About</a></li>
          <li><a href="#" className="nav-link">Contact</a></li>
        </ul>
        <div className="buttons">
          <button className="login-button">Login</button>
          <button className="signup-button">Sign Up</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
