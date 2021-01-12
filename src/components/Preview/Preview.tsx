import React from "react";
import NextLink from "next/link";
import { Box, Flex, Image, Optional, TextMeta } from "@gatsby-tv/components";
import { Video } from "@gatsby-tv/types";
import { Time, useTheme, useIPFSContent } from "@gatsby-tv/utilities";

import { Link } from "@src/components/Link";

import { Overlay } from "./components/Overlay";
import { Info } from "./components/Info";
import { InfoWrapper } from "./components/InfoWrapper";

export interface PreviewProps {
  compact?: boolean;
  video: Video;
}

export function Preview(props: PreviewProps): React.ReactElement {
  const [video, channel] = [props.video, props.video.channel];
  const theme = useTheme();
  const { url: thumbnail } = useIPFSContent(video.thumbnail);
  const { url: avatar } = useIPFSContent(channel.avatar);

  return (
    <Flex column={!props.compact} gap={theme.spacing.tight}>
      <Image
        src={thumbnail}
        overlay={<Overlay duration={video.duration} />}
        rounded={theme.border.radius.smallest}
        aspectRatio={0.5625}
      />
      <Flex.Item minw="25rem">
        <Optional
          active={!props.compact}
          component={InfoWrapper}
          $props={{ avatar, handle: channel.handle }}
        >
          <Flex column gap={theme.spacing.extraTight}>
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
