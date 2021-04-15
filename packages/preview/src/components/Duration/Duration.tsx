import React from "react";
import { TextMeta } from "@gatsby-tv/components";
import {
  Browsable,
  isVideo,
  isEpisodicShow,
  isSeasonedShow,
  isPlaylist,
} from "@gatsby-tv/types";
import { Value, Time } from "@gatsby-tv/utilities";

import styles from "@src/Preview.scss";

export interface DurationProps {
  content: Browsable;
}

export function Duration(props: DurationProps): React.ReactElement {
  const { content } = props;

  if (isVideo(content)) {
    return (
      <div className={styles.Duration}>
        <TextMeta className={styles.DurationText}>
          {Time(content.duration)}
        </TextMeta>
      </div>
    );
  } else if (isSeasonedShow(content)) {
    return (
      <div className={styles.Duration}>
        <TextMeta className={styles.DurationText}>
          {Value(content.seasons.length, "season")}
        </TextMeta>
      </div>
    );
  } else if (isEpisodicShow(content)) {
    return (
      <div className={styles.Duration}>
        <TextMeta className={styles.DurationText}>
          {Value(content.episodes.length, "episode")}
        </TextMeta>
      </div>
    );
  } else if (isPlaylist(content)) {
    return (
      <div className={styles.Duration}>
        <TextMeta className={styles.DurationText}>
          {Value(content.videos.length, "video")}
        </TextMeta>
      </div>
    );
  } else {
    throw new Error("Duration component was passed incorrect prop.");
  }
}
