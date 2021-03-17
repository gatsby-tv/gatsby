import React from "react";
import {
  Avatar,
  Box,
  Flex,
  Icon,
  TextMeta,
  Optional,
  TextDisplay,
} from "@gatsby-tv/components";
import { CheckmarkFill } from "@gatsby-tv/icons";
import {
  ChannelHandle,
  FullValue,
  ifExists,
  useTheme,
} from "@gatsby-tv/utilities";
import { Channel as ChannelType } from "@gatsby-tv/types";
import { Link } from "@gatsby-tv/next";

import { Skeleton, SkeletonProps, isSkeletonProps } from "./Skeleton";

export type { SkeletonProps as ChannelSkeletonProps };
export { isSkeletonProps as isChannelSkeletonProps };

export interface ChannelProps {
  channel: ChannelType;
  blurb?: string | string[];
  link?: boolean;
}

export function isChannelProps(props: any): props is ChannelProps {
  return (props as ChannelProps).channel !== undefined;
}

function ChannelBase(props: ChannelProps): React.ReactElement {
  const theme = useTheme();
  const {
    channel,
    link,
    blurb = [
      ChannelHandle(channel.handle),
      FullValue(channel.subscribers, "subscriber"),
    ],
  } = props;

  const verifiedProps = {
    active: channel.verified,
    $props: { gap: theme.spacing[1] },
  };

  const avatarLinkBoxProps = {
    active: ifExists(link),
    $props: { h: "fit-content" },
  };

  const avatarLinkProps = {
    active: ifExists(link),
    $props: { href: `/${channel.handle}` },
  };

  const textLinkBoxProps = {
    active: ifExists(link),
    $props: { w: "fit-content" },
  };

  const textLinkProps = {
    active: ifExists(link),
    $props: {
      href: `/${channel.handle}`,
      $props: {
        underline: true,
      },
    },
  };

  const AvatarMarkup = (
    <Flex.Item shrink={0}>
      <Optional component={Box} {...avatarLinkBoxProps}>
        <Optional component={Link} {...avatarLinkProps}>
          <Avatar src={channel.avatar} size={theme.avatar.largest} />
        </Optional>
      </Optional>
    </Flex.Item>
  );

  const VerifiedMarkup = channel.verified ? (
    <Icon src={CheckmarkFill} w={theme.icon.smaller} />
  ) : null;

  const NameMarkup = (
    <Optional component={Flex} {...verifiedProps}>
      <Optional component={Box} {...textLinkBoxProps}>
        <Optional component={Link} {...textLinkProps}>
          <TextDisplay>{channel.name}</TextDisplay>
        </Optional>
      </Optional>
      {VerifiedMarkup}
    </Optional>
  );

  const InfoMarkup =
    typeof blurb === "string" ? (
      <TextMeta bold font={theme.font[4]}>
        {blurb}
      </TextMeta>
    ) : (
      <TextMeta.List bold font={theme.font[4]}>
        {blurb.map((item, index) => (
          <TextMeta key={`meta.${index}`}>{item}</TextMeta>
        ))}
      </TextMeta.List>
    );

  return (
    <Flex center gap={theme.spacing[1.5]}>
      {AvatarMarkup}
      <Flex column>
        {NameMarkup}
        {InfoMarkup}
      </Flex>
    </Flex>
  );
}

export const Channel = Object.assign(ChannelBase, {
  Skeleton,
  displayName: "ChannelInfoHeader",
});
