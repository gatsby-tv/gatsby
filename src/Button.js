import React, { Component } from "react";

import "./Button.css";

// TODO: Write doc on props
class Button extends Component {

  render() {
    return (
      <button className="Button">
        {this.props.text}
      </button>
    );
  }
}

export default Button;