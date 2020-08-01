import React, { Component } from 'react';
import HLS from "hls.js";
// TODO: Maintained by single dev and doesn't have types...
// We may want to eventually fork this for our own purposes
// @ts-ignore
import IPFSLoader from "hlsjs-ipfs-loader";

import ipfs from "../utilities/ipfs";

import './Video.css';

type VideoProps = {
  hash: string,
  controls: boolean
}

type VideoState = {
}

/**
 * The video component is a modular view of an HLS over IPFS stream played in a video element.
 * This can be used in a standard watch page, picture-in-picture view, or elsewhere.
 */
class Video extends Component<VideoProps, VideoState> {

  private video: HTMLVideoElement | null = null;

  async componentDidMount() {
    HLS.DefaultConfig.loader = IPFSLoader;
    const hls: HLS = new HLS();

    // TODO: Types not yet defined for IPFS loader used
    // @ts-ignore
    hls.config.ipfs = await ipfs;
    // @ts-ignore
    hls.config.ipfsHash = this.props.hash;

    // Load the main manifest file TODO: we will need standardized naming for this
    hls.loadSource("master.m3u8");
    if (this.video) {
      hls.attachMedia(this.video);
      // TODO: Look into asking for autoplay permission
      // Start muted to allow autoplay
      this.video.muted = true;
      hls.on(HLS.Events.MANIFEST_PARSED, () => this.video?.play());
    }
  }

  render() {
    return (
      <div className="Video">
        <video
          ref={ref => this.video = ref}
          controls={this.props.controls} />
      </div>
    );
  }
}

export default Video;
