import React, { Component } from "react";
import HLS from "hls.js";
// TODO: Maintained by single dev... we may want to eventually fork this for our own purposes
import IPFSLoader from "hlsjs-ipfs-loader";
import moment from "moment";

import ipfs from "./ipfs";

// TODO: Prototyping data, move to tests later
import stub from "./stubs/get-video.json"

import "./Watch.css";

class Watch extends Component {

  async componentDidMount() {
    let params = new URLSearchParams(window.location.search);
    this.loadVideo(params.get("hash"));
  }

  render() {

    const metadata = stub;
    const dateUploaded = new Date(parseInt(metadata.date_uploaded) * 1000);

    return (
      <div className="Watch">
        <div className="VideoWrapper">
          <video ref={ref => this.video = ref} controls={true} />
          <div className="Details">
            <div className="Metadata">
              <h1>{metadata.title}</h1>
              <h4>{parseInt(metadata.views).toLocaleString()} • {moment(dateUploaded).format("MMM Do, YYYY")}</h4>
            </div>
            <div className="Actions">
              <button className="Subscribe">Subscribe</button>
              <button className="TipYourHat">Tip your hat</button>
            </div>
          </div>
        </div>
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
