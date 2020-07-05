import React, { Component } from "react";
import HLS from "hls.js";
// Maintained by single dev... we may want to eventually fork this for our own purposes
import IPFSLoader from "hlsjs-ipfs-loader";

import ipfs from "./ipfs";

import "./Watch.css";

class Watch extends Component {

  async componentDidMount() {
    let params = new URLSearchParams(window.location.search);
    this.loadVideo(params.get("hash"));
  }

  render() {
    return (
      <div className="Watch">
        <video ref={ref => this.video = ref} controls={true} />
      </div>
    );
  }

  loadVideo = async (cid) => {
    HLS.DefaultConfig.loader = IPFSLoader;
    // HLS.DefaultConfig.debug = true;
    const hls = new HLS();
    hls.config.ipfs = await ipfs;
    hls.config.ipfsHash = cid;

    // Load the main manifest file (we will need standardized naming for this)
    hls.loadSource("master.m3u8");
    hls.attachMedia(this.video);
    // Start muted to allow autoplay
    this.video.muted = true;
    hls.on(HLS.Events.MANIFEST_PARSED, () => this.video.play());
  }
}

export default Watch;
