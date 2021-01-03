import React from "react";
import NextLink from "next/link";
import { CheckmarkFill } from "@gatsby-tv/icons";
import {
  Flex,
  Box,
  Icon,
  Image,
  Optional,
  TextMeta,
} from "@gatsby-tv/components";
import {
  Time,
  Age,
  Value,
  useTheme,
  useIPFSContent,
} from "@gatsby-tv/utilities";

import { Video, Channel } from "@src/types";
import { Link } from "@src/components/Link";

import { MetaWrapper } from "./components/MetaWrapper";

export interface PreviewProps {
  compact?: boolean;
  video: Video;
  channel: Channel;
}

export function Preview(props: PreviewProps): React.ReactElement {
  const theme = useTheme();
  const { url: thumbnail } = useIPFSContent(
    `/ipfs/${props.video.thumbnail[0]}`,
    props.video.thumbnail[1]
  );
  const { url: avatar } = useIPFSContent(
    `/ipfs/${props.channel.avatar[0]}`,
    props.channel.avatar[1]
  );

  const overlayMarkup = (
    <Box
      $absolute
      $bottom={theme.spacing.extraTight}
      $right={theme.spacing.extraTight}
    >
      <Box
        $bg={theme.colors.black.fade(0.3)}
        $paddingLeft={theme.spacing.extraTight}
        $paddingRight={theme.spacing.extraTight}
      >
        <TextMeta $bold $size="small">
          {Time(props.video.duration)}
        </TextMeta>
      </Box>
    </Box>
  );

  const titleMarkup = (
    <TextMeta $bold $clamp={2}>
      {props.video.title}
    </TextMeta>
  );

  const infoMarkup = (
    <Flex $column>
      <Flex $gap={theme.spacing.extraTight}>
        <Box $zIndex={2}>
          <NextLink href={`/${props.channel.handle}`} passHref>
            <TextMeta.Link $bold $size="small">
              {props.channel.name}
            </TextMeta.Link>
          </NextLink>
        </Box>
        {props.channel.verified && (
          <Icon $source={CheckmarkFill} $width={theme.icon.extraSmall} />
        )}
      </Flex>
      <TextMeta.List $subdued>
        <TextMeta $bold $size="small">
          {Value(props.video.views, "view")}
        </TextMeta>
        <TextMeta $bold $size="small">
          {Age(props.video.age)}
        </TextMeta>
      </TextMeta.List>
    </Flex>
  );

  return (
    <Flex $column={!props.compact} $gap={theme.spacing.tight}>
      <Image
        src={thumbnail}
        $overlay={overlayMarkup}
        $rounded={theme.border.radius.smallest}
        $aspectRatio={0.5625}
      />
      <Flex.Item $minWidth="25rem">
        <Optional
          $active={!props.compact}
          $component={MetaWrapper}
          $props={{ channel: props.channel, avatar }}
        >
          <Flex $column $gap={theme.spacing.extraTight}>
            {titleMarkup}
            {infoMarkup}
          </Flex>
        </Optional>
      </Flex.Item>
      <Link href={`/v/${props.video.hash}`}>
        <Box $absolute $fill $zIndex={1} />
      </Link>
    </Flex>
  );
}
