import React, { Component } from 'react';
import IPFS from 'ipfs';
import HLS from 'hls.js';

// Maintained by single dev... we may want to eventually fork this for our own purposes
import IPFSLoader from 'hlsjs-ipfs-loader';

import './App.css';

class App extends Component {

  constructor() {
    super();
    // Initial state
    this.state = {
      ipfsLoaded: false,
      cid: ""
    }
  }

  async componentDidMount() {
    this.setState({
      ipfsLoaded: await this.initIPFS()
    });
  }

  render() {
    if (this.state.ipfsLoaded) {
      return (
        <div className="App">
          Some caveats:
          <span>1. The manifest for the HLS stream needs to be named "master.m3u8" for this demo. We should ideally have a standazrd name for this when we transcode videos. Probably "index.m3u8".</span>
          {/* TODO: Either use custom or third-party video player */}
          <video ref={ref => this.video = ref} controls={true} />
          <input onKeyPress={this.onKeyPress} ref={ref =>  this.input = ref} type="text" placeholder="Paste a CID and press Enter" />
          Examples:
          <div>
            <a href="QmdpAidwAsBGptFB3b6A9Pyi5coEbgjHrL3K2Qrsutmj9K" onClick={this.onExampleClicked}>Big Buck Bunny</a>
          </div>
        </div>
      );
    } else {
      return(<div className="App">Loading IPFS...</div>);
    }
  }

  initIPFS = async () => {
    // Use random repo, don't share repos between tabs/sessions
    // TODO: We may want to look at this later and determine if shared ipfs sessions would be better
    this.ipfs = await IPFS.create({
      repo: '/ipfs/' + Math.random()
    });
    return true;
  }

  // Enter pressed on input box
  onKeyPress = async (event) => {
    if (event.key !== "Enter") return;
    this.setState({
      cid: event.target.value
    },
    this.loadVideo);
  }

  onExampleClicked = async (event) => {
    event.preventDefault();
    // Get the IPFS cid hash from the link url
    let cid = event.target.href.split("/").pop()
    this.input.value = cid;
    this.setState({
      cid: cid,
    },
    this.loadVideo);
  }

  loadVideo = async () => {
    HLS.DefaultConfig.loader = IPFSLoader;
    // Turn debug on for demo
    HLS.DefaultConfig.debug = true;
    const hls = new HLS();
    hls.config.ipfs = this.ipfs;
    hls.config.ipfsHash = this.state.cid;

    // Load the main manifest file (we will need standardized naming for this)
    hls.loadSource("master.m3u8");
    hls.attachMedia(this.video);
    hls.on(HLS.Events.MANIFEST_PARSED, () => this.video.play());
  }
}

export default App;
