import React from "react";
import { Box, Flex, Icon, TextDisplay } from "@gatsby-tv/components";
import { Topic, Video } from "@gatsby-tv/types";
import { ExtendRight } from "@gatsby-tv/icons";
import { useTheme, useBreakpoints } from "@gatsby-tv/utilities";

import { Preview } from "@src/components/Preview";
import { Link } from "@src/components/Link";

export interface TopicPreviewProps {
  topic: Topic;
  videos: Video[];
}

export function TopicPreview(props: TopicPreviewProps) {
  const theme = useTheme();
  const breakpoint = useBreakpoints({
    1: "(max-width: 650px)",
    2: "(min-width: 650px) and (max-width: 900px)",
    3: "(min-width: 900px) and (max-width: 1175px)",
    4: "(min-width: 1175px)",
  }) as number;

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
      <Flex wrapped gap={theme.spacing.base} groups={breakpoint ?? 4}>
        {props.videos.slice(0, breakpoint ?? 4).map((video, index) => (
          <Flex.Item>
            <Preview key={index} video={video} avatar={theme.avatar.basesmall} />
          </Flex.Item>
        ))}
      </Flex>
    </Flex>
  );
}
