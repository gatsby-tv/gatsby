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
import { FullValue, ifExists, useTheme } from "@gatsby-tv/utilities";
import { Channel as ChannelType } from "@gatsby-tv/types";

import { Link } from "@src/components/Link";

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
    blurb = FullValue(channel.subscribers, "subscriber"),
  } = props;

  const verifiedProps = {
    active: channel.verified,
    $props: { gap: theme.spacing[1] },
  };

  const linkBoxProps = {
    active: ifExists(link),
    $props: { w: "fit-content" },
  };

  const linkProps = {
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
      <Avatar src={channel.avatar} size={theme.avatar.largest} />
    </Flex.Item>
  );

  const VerifiedMarkup = channel.verified ? (
    <Icon src={CheckmarkFill} w={theme.icon.smaller} />
  ) : null;

  const NameMarkup = (
    <Optional component={Flex} {...verifiedProps}>
      <Optional component={Box} {...linkBoxProps}>
        <Optional component={Link} {...linkProps}>
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
