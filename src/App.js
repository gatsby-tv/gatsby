import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ipfs from "./ipfs";

import Home from "./Home";
import Navbar from "./Navbar";
import Watch from "./Watch";

import "./App.css";

class App extends Component {

  constructor() {
    super();
    this.state = {
      ipfsLoaded: false
    }
  }

  async componentDidMount() {
    this.setState({
      ipfsLoaded: await ipfs
    });
  }

  render() {
    if (this.state.ipfsLoaded) {
      return (
        <div className="App">
          <BrowserRouter>
            {/* Navbar */}
            <Navbar />
            <div className="Content">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/watch" component={Watch} />
              </Switch>
            </div>
          </BrowserRouter>
        </div>
      );
    } else {
      return (<div className="App">Loading IPFS...</div>);
    }
  }
}

export default App;
