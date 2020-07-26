import React, { Component } from "react";
import { Link } from "react-router-dom";

// Assets
import Logo from "./assets/logo.png"

// CSS
import "./Navbar.css";

class Navbar extends Component {

  render() {
    return (
      <div className="Navbar">
        <Link to="/">
          <div className="LogoAndTypeface">
            {/* Logo */}
            <img className="Logo" src={Logo} alt="" />
            <span>Gatsby</span>
          </div>
        </Link>
        {/* TODO: Search */}
        {/* TODO: User registration/login */}
      </div>
    );
  }
}

export default Navbar;