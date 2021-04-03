import React from "react";
import { Avatar, Flex, Optional, TextPlaceholder } from "@gatsby-tv/components";
import { ifExists, ifNotExists, useTheme } from "@gatsby-tv/utilities";

export interface SkeletonProps {
  content?: boolean;
  channel?: boolean;
  avatar?: string;
}

export function isSkeletonProps(props: any): props is SkeletonProps {
  return (props as SkeletonProps).content !== undefined;
}

export function Skeleton(props: SkeletonProps): React.ReactElement {
  const { channel, avatar } = props;
  const theme = useTheme();

  const avatarProps = {
    active: ifExists(avatar && channel),
    $props: { gap: theme.spacing[1] },
  };

  const flexProps = {
    column: true,
    w: 1,
    gap: theme.spacing[0.5],
    marginBottom: ifNotExists(channel, "2px"),
  };

  const AvatarMarkup = avatar && channel ? (
    <Flex.Item shrink={0}>
      <Avatar size={avatar} />
    </Flex.Item>
  ) : null;

  const TitleMarkup = <TextPlaceholder heading font={theme.font[4]} w={0.8} />;

  const TextMarkup = <TextPlaceholder font={theme.font[5]} w={0.5} />;

  const NameMarkup = channel ? TextMarkup : null;

  return (
    <Optional component={Flex} {...avatarProps}>
      {AvatarMarkup}
      <Flex {...flexProps}>
        {TitleMarkup}
        {NameMarkup}
        {TextMarkup}
      </Flex>
    </Optional>
  );
}
