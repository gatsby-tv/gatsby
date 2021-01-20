import React from "react";
import {
  Box,
  Flex,
  Icon,
  Optional,
  Scroll,
  Slider,
  TextDisplay,
} from "@gatsby-tv/components";
import { Topic, Video } from "@gatsby-tv/types";
import { ExtendRight } from "@gatsby-tv/icons";
import { useTheme, useFrame } from "@gatsby-tv/utilities";

import { Preview } from "@src/components/Preview";
import { Link } from "@src/components/Link";

export interface TopicPreviewProps {
  topic: Topic;
  videos: Video[];
}

export function TopicPreview(props: TopicPreviewProps) {
  const theme = useTheme();
  const { screen } = useFrame();

  return (
    <Flex column gap={theme.spacing.basetight}>
      <Box w="fit-content">
        <Link underline href={`/d/topic/${props.topic}`}>
          <Flex h="3.5rem" gap={theme.spacing.tight} align="center">
            <TextDisplay thin>{props.topic}</TextDisplay>
            <Icon src={ExtendRight} w={theme.icon.basesmall} />
          </Flex>
        </Link>
      </Box>
      <Slider groups={5} gap={theme.spacing.base}>
        {props.videos.map((video, index) => (
          <Preview
            video={video}
            avatar={
              screen !== "desktop"
                ? theme.avatar.extrasmall
                : theme.avatar.basesmall
            }
          />
        ))}
      </Slider>
    </Flex>
  );
}
