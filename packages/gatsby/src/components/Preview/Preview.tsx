import React from "react";
import {
  Flex,
  Image,
  Optional,
  TextMeta,
  Labelled,
} from "@gatsby-tv/components";
import { Content } from "@gatsby-tv/types";
import { ifExists, useTheme, useUniqueId } from "@gatsby-tv/utilities";

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
  ariaPosInSet?: number;
  ariaSetSize?: number;
}

function PreviewBase(props: PreviewProps): React.ReactElement {
  const [content, channel] = [props.content, props.content.channel];
  const id = useUniqueId("preview-label");
  const theme = useTheme();
  const {
    format = "default",
    avatar: size = theme.avatar.base,
    ariaPosInSet,
    ariaSetSize,
  } = props;

  const titleProps = {
    id,
    bold: true,
    heading: true,
    clamp: 2,
    font: theme.font[4],
    "data-label": true,
  };

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

  const linkProps = {
    overlay: true,
    zIndex: 1,
  };

  const infoFlexProps = {
    column: true,
    gap: ifExists(format !== "nochannel", theme.spacing[0.5]),
  };

  const flexProps = {
    column: format !== "compact",
    gap: theme.spacing[1],
    "aria-posinset": ariaPosInSet,
    "aria-setsize": ariaSetSize,
  };

  const TitleMarkup = <TextMeta {...titleProps}>{content.title}</TextMeta>;

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

  return (
    <Labelled as="article" component={Flex} $props={flexProps}>
      <Image {...imageProps} />
      {InfoMarkup}
      <Link href={`/v/${content._id}`} $props={linkProps} />
    </Labelled>
  );
}

export const Preview = Object.assign(PreviewBase, {
  Skeleton,
  displayName: "Preview",
});
