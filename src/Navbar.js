import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

class Navbar extends Component {

  render() {
    return (
      <div className="Navbar">
        <Link to="/"><span>Vydio</span></Link>
        {/* TODO: Search */}
        {/* TODO: User registration/login */}
      </div>
    );
  }
}

export default Navbar;