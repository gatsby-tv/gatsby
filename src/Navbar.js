import React, { Component } from "react";

import "./Navbar.css";
import Button from "./Button";

class Navbar extends Component {

  render() {
    return (
      <div className="Navbar">
        <span>Vydio</span>
        {/* TODO: Search */}
        {/* TODO: Move user info to it's own component */}
        <span className="Login">
          <Button
            text="Login"
          />
          <Button
            text="Register"
          />
        </span>
      </div>
    );
  }
}

export default Navbar;