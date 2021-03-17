import React from "react";
import { Box, TextMeta } from "@gatsby-tv/components";
import {
  Content,
  isVideo,
  isEpisodicShow,
  isSeasonedShow,
  isPlaylist,
} from "@gatsby-tv/types";
import { Value, Time, useTheme } from "@gatsby-tv/utilities";

export interface OverlayProps {
  content: Content;
}

export function Overlay(props: OverlayProps): React.ReactElement {
  const { content } = props;
  const theme = useTheme();

  const boxProps = {
    absolute: true,
    bottom: theme.spacing[0.5],
    right: theme.spacing[0.5],
    bg: theme.colors.black.fade(0.3),
    padding: [theme.spacing[0], theme.spacing[0.5]],
  };

  if (isVideo(content)) {
    return (
      <Box {...boxProps}>
        <TextMeta bold>{Time(content.duration)}</TextMeta>
      </Box>
    );
  } else if (isSeasonedShow(content)) {
    return (
      <Box {...boxProps}>
        <TextMeta bold>{Value(content.seasons.length, "season")}</TextMeta>
      </Box>
    );
  } else if (isEpisodicShow(content)) {
    return (
      <Box {...boxProps}>
        <TextMeta bold>{Value(content.episodes.length, "episode")}</TextMeta>
      </Box>
    );
  } else if (isPlaylist(content)) {
    return (
      <Box {...boxProps}>
        <TextMeta bold>{Value(content.videos.length, "video")}</TextMeta>
      </Box>
    );
  } else {
    throw new Error("Overlay component was passed incorrect prop");
  }
}
