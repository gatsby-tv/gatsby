import React, { Component } from 'react';
// import { BrowserRouter, Switch, Route } from "react-router-dom";
import ipfs from "./utilities/ipfs";

import './App.css';

type AppProps = {
}

type AppState = {
  ipfsLoaded: boolean
}

class App extends Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
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
          {/* TODO */}
        </div>
      );
    } else {
      return (<div className="App">Loading IPFS...</div>);
    }
  }
}

export default App;
