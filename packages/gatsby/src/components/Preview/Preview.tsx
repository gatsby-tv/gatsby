import React from "react";
import {
  Flex,
  Image,
  Optional,
  TextMeta,
  Labelled,
} from "@gatsby-tv/components";
import { Content } from "@gatsby-tv/types";
import {
  ifExists,
  ifNotExists,
  useTheme,
  useUniqueId,
} from "@gatsby-tv/utilities";

import { PreviewFormat } from "@src/types";
import { Info } from "@src/components/Info";
import { Link } from "@src/components/Link";

import { Overlay } from "./components/Overlay";

import { Skeleton, SkeletonProps } from "./Skeleton";

export type { SkeletonProps as PreviewSkeletonProps };

export interface PreviewProps {
  content: Content;
  format?: PreviewFormat;
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
    avatar = theme.avatar.base,
    ariaPosInSet,
    ariaSetSize,
  } = props;

  const imageProps = {
    src: content.thumbnail,
    rounded: theme.border.radius.smallest,
    aspectRatio: 0.5625,
    overlay: <Overlay content={content} />,
  };

  const itemProps = {
    active: format === "compact",
    $props: { basis: 0.8 },
  };

  const infoProps = {
    content,
    avatar: ifNotExists(format === "compact", avatar),
    channel: ifNotExists(format === "nochannel", channel),
  };

  const linkProps = {
    overlay: true,
    zIndex: 1,
  };

  const flexProps = {
    column: format !== "compact",
    gap: theme.spacing[1],
    "aria-posinset": ariaPosInSet,
    "aria-setsize": ariaSetSize,
  };

  return (
    <Labelled as="article" component={Flex} $props={flexProps}>
      <Image {...imageProps} />
      <Optional component={Flex.Item} {...itemProps}>
        <Info {...infoProps} />
      </Optional>
      <Link href={`/v/${content._id}`} $props={linkProps} />
    </Labelled>
  );
}

export const Preview = Object.assign(PreviewBase, {
  Skeleton,
  displayName: "Preview",
});
