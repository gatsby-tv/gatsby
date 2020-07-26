import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import "./VideoThumbnail.css";

/**
 * Stateless component for rendering video thumbnails.
 *
 * Props:
 * title: {String} Title of the video.
 * views: {Number} total views of the video.
 * dateUploaded: {String} Unix timestamp of the date the video was uploaded.
 * thumbnail: {String} URL to the image of the video's thumbnail.
 * url: {String} URL to view the video.
 */
class VideoThumbnail extends Component {

  render() {

    // Convert timestamp to Date to get how long ago the video was uploaded
    const dateUploaded = new Date(parseInt(this.props.dateUploaded) * 1000);

    return (
      <div className="VideoThumbnail">
        <Link to={this.props.url}>
          <img src={this.props.thumbnail} alt={this.props.title} />
        </Link>
        <div>{this.props.title}</div>
        <div>{this.props.views.toLocaleString()} • {moment(dateUploaded).fromNow()}</div>
      </div>
    );
  }
}

export default VideoThumbnail;