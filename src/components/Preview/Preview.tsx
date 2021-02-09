import React from "react";
import { Box, Flex, Image, Optional, TextMeta } from "@gatsby-tv/components";
import { Content } from "@gatsby-tv/types";
import { ifExists, useTheme } from "@gatsby-tv/utilities";

import { ListingFormat } from "@src/types";
import { Link } from "@src/components/Link";

import { Overlay } from "./components/Overlay";
import { Info } from "./components/Info";
import { InfoWrapper } from "./components/InfoWrapper";
import { Skeleton, SkeletonProps } from "./components/Skeleton";

export type { SkeletonProps as PreviewSkeletonProps };

export interface PreviewProps {
  content: Content;
  format?: ListingFormat;
  avatar?: string;
}

function PreviewBase(props: PreviewProps): React.ReactElement {
  const [content, channel] = [props.content, props.content.channel];
  const theme = useTheme();
  const { format = "default", avatar: size = theme.avatar.base } = props;

  const imageProps = {
    src: content.thumbnail,
    rounded: theme.border.radius.smallest,
    aspectRatio: 0.5625,
    overlay: <Overlay content={content} />,
  };

  const infoOptionalProps = {
    active: format === "default",
    $props: { channel, size },
  };

  const itemOptionalProps = {
    active: format === "compact",
    $props: { basis: 0.8 },
  };

  const infoFlexProps = {
    column: true,
    gap: ifExists(format !== "nochannel", theme.spacing[0.5]),
  };

  const TitleMarkup = (
    <TextMeta bold clamp={2} heading font={theme.font[4]}>
      {content.title}
    </TextMeta>
  );

  const InfoMarkup = (
    <Optional component={Flex.Item} {...itemOptionalProps}>
      <Optional component={InfoWrapper} {...infoOptionalProps}>
        <Flex {...infoFlexProps}>
          {TitleMarkup}
          <Info format={format} channel={channel} content={content} />
        </Flex>
      </Optional>
    </Optional>
  );

  const LinkMarkup = (
    <Link href={`/v/${content._id}`}>
      <Box absolute expand zIndex={1} />
    </Link>
  );

  return (
    <Flex column={format !== "compact"} gap={theme.spacing[1]}>
      <Image {...imageProps} />
      {InfoMarkup}
      {LinkMarkup}
    </Flex>
  );
}

export const Preview = Object.assign(PreviewBase, { Skeleton });
