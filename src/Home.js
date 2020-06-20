import React, { Component } from "react";

import Navbar from "./Navbar";
import VideoThumbnail from "./VideoThumbnail";

import stub from "./json-stubs/get-home.json"

import "./Home.css";

class Home extends Component {

  render() {

    // Map thumbnail data returned from REST api to stubs
    const thumbnails = stub.videos.map((video) => {
      return (
        <VideoThumbnail
          key={video.id}
          title={video.title}
          views={parseInt(video.views)}
          dateUploaded={video.date_uploaded}
          thumbnail={video.thumbnail}
          url={video.url}
        />
      );
    });

    return (
      <div className="Home">
        {/* Navbar */}
        <Navbar />
        {/* Video thumbnails */}
        <div className="VideoThumbnails">
          {thumbnails}
        </div>
      </div>
    );
  }
}

export default Home;