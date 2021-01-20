import React from "react";
import NextLink from "next/link";
import { Box, Flex, Image, Optional, TextMeta } from "@gatsby-tv/components";
import { Video } from "@gatsby-tv/types";
import {
  Time,
  Negative,
  ifExists,
  ifNotExists,
  useTheme,
  useFrame,
} from "@gatsby-tv/utilities";

import { Link } from "@src/components/Link";

import { Overlay } from "./components/Overlay";
import { Info } from "./components/Info";
import { InfoWrapper } from "./components/InfoWrapper";

export interface PreviewProps {
  compact?: boolean;
  expand?: boolean;
  avatar?: string;
  video: Video;
}

export function Preview(props: PreviewProps): React.ReactElement {
  const [video, channel] = [props.video, props.video.channel];
  const { screen } = useFrame();
  const theme = useTheme();

  return (
    <Flex column={!props.compact} gap={theme.spacing.tight}>
      <Optional
        active={screen === "mobile" && props.expand}
        component={Box}
        $props={{
          margin: [theme.spacing.none, Negative(theme.spacing.tight)],
        }}
      >
        <Image
          src={video.thumbnail}
          overlay={<Overlay duration={video.duration} />}
          rounded={ifNotExists(
            screen === "mobile",
            theme.border.radius.smallest
          )}
          aspectRatio={0.5625}
        />
      </Optional>
      <Flex.Item basis={ifExists(props.compact, 1)}>
        <Optional
          active={!props.compact}
          component={InfoWrapper}
          $props={{
            avatar: channel.avatar,
            handle: channel.handle,
            size: props.avatar,
          }}
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
