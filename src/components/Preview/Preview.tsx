import React from "react";
import NextLink from "next/link";
import { Box, Flex, Image, Optional, TextMeta } from "@gatsby-tv/components";
import { Video } from "@gatsby-tv/types";
import { Time, ifExists, useTheme } from "@gatsby-tv/utilities";

import { Link } from "@src/components/Link";

import { Overlay } from "./components/Overlay";
import { Info } from "./components/Info";
import { InfoWrapper } from "./components/InfoWrapper";

export interface PreviewProps {
  compact?: boolean;
  video: Video;
  avatar?: string;
}

export function Preview(props: PreviewProps): React.ReactElement {
  const [video, channel] = [props.video, props.video.channel];
  const theme = useTheme();

  return (
    <Flex column={!props.compact} gap={theme.spacing.tight}>
      <Image
        src={video.thumbnail}
        overlay={<Overlay duration={video.duration} />}
        rounded={theme.border.radius.smallest}
        aspectRatio={0.5625}
      />
      <Flex.Item basis={ifExists(props.compact, 1)} minw="25rem">
        <Optional
          active={!props.compact}
          component={InfoWrapper}
          $props={{ avatar: channel.avatar, handle: channel.handle, size: props.avatar }}
        >
          <Flex column gap={theme.spacing.extratight}>
            <TextMeta bold clamp={2}>
              {video.title}
            </TextMeta>
            <Info
              name={channel.name}
              handle={channel.handle}
              verified={channel.verified}
              views={video.views}
              releaseDate={video.releaseDate}
            />
          </Flex>
        </Optional>
      </Flex.Item>
      <Link href={`/v/${[video.content].flat()[0]}`}>
        <Box absolute expand zIndex={1} />
      </Link>
    </Flex>
  );
}
