import React from "react";
import {
  Optional,
  Flex,
  Avatar,
  Image,
  TextPlaceholder,
} from "@gatsby-tv/components";
import { ifExists, useTheme } from "@gatsby-tv/utilities";

import { ListingFormat } from "@src/types";

export interface SkeletonProps {
  format?: ListingFormat;
  avatar?: string;
}

export function Skeleton(props: SkeletonProps): React.ReactElement {
  const theme = useTheme();
  const { format = "default", avatar: size = theme.avatar.base } = props;

  const flexProps = {
    column: format !== "compact",
    w: 1,
    gap: theme.spacing[1],
    marginBottom: theme.spacing[1],
  };

  const infoOptionalProps = {
    active: format === "default",
    $props: { gap: theme.spacing[1] },
  };

  const itemOptionalProps = {
    active: format === "compact",
    $props: { basis: 0.8 },
  };

  const infoFlexProps = {
    column: true,
    w: 1,
    gap: theme.spacing[0.5],
    marginBottom: ifExists(format !== "nochannel", "2px"),
  };

  const TitleMarkup = <TextPlaceholder heading font={theme.font[4]} w={0.8} />;

  const TextMarkup = <TextPlaceholder font={theme.font[5]} w={0.5} />;

  const NameMarkup = format !== "nochannel" ? TextMarkup : null;

  const AvatarMarkup =
    format === "default" ? (
      <Flex.Item shrink={0}>
        <Avatar size={size} />
      </Flex.Item>
    ) : null;

  const InfoMarkup = (
    <Optional component={Flex.Item} {...itemOptionalProps}>
      <Optional component={Flex} {...infoOptionalProps}>
        {AvatarMarkup}
        <Flex {...infoFlexProps}>
          {TitleMarkup}
          {NameMarkup}
          {TextMarkup}
        </Flex>
      </Optional>
    </Optional>
  );

  return (
    <Flex {...flexProps}>
      <Image rounded={theme.border.radius.smallest} aspectRatio={0.5625} />
      {InfoMarkup}
    </Flex>
  );
}
