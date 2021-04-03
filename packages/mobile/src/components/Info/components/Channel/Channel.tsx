import React from "react";
import {
  Avatar,
  Button,
  Flex,
  Icon,
  Optional,
  TextMeta,
} from "@gatsby-tv/components";
import { CheckmarkFill } from "@gatsby-tv/icons";
import {
  Value,
  ChannelHandle,
  ifExists,
  useTheme,
  useModal,
} from "@gatsby-tv/utilities";
import { Channel as ChannelType } from "@gatsby-tv/types";

import { ChannelModal } from "@src/components/ChannelModal";

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
  const modal = useModal();
  const {
    channel,
    link,
    blurb = Value(channel.subscribers, "subscriber") as string,
  } = props;

  const buttonProps = {
    active: ifExists(link),
    $props: { unstyled: true, onClick: modal.activate },
  };

  const verifiedProps = {
    active: ifExists(channel.verified),
    $props: { gap: theme.spacing[0.5] },
  };

  const modalProps = {
    channel,
    active: modal.active,
    onExit: modal.deactivate,
  };

  const AvatarMarkup = (
    <Flex.Item shrink={0}>
      <Avatar src={channel.avatar} size={theme.avatar.small} />
    </Flex.Item>
  );

  const VerifiedMarkup = channel.verified ? (
    <Icon src={CheckmarkFill} w={theme.icon.smallest} />
  ) : null;

  const NameMarkup = (
    <Optional component={Flex} {...verifiedProps}>
      <TextMeta bold font={theme.font[4]}>
        {channel.name}
      </TextMeta>
      {VerifiedMarkup}
    </Optional>
  );

  const BlurbMarkup = typeof blurb === "string" ? (
    <TextMeta.List subdued bold font={theme.font[5]}>
      <TextMeta>{ChannelHandle(channel.handle)}</TextMeta>
      <TextMeta>{blurb}</TextMeta>
    </TextMeta.List>
  ) : (
    <TextMeta.List subdued bold font={theme.font[5]}>
      <TextMeta>{ChannelHandle(channel.handle)}</TextMeta>
      {blurb.map((item, index) => (
        <TextMeta key={`meta.${index}`}>{item}</TextMeta>
      ))}
    </TextMeta.List>
  );

  return (
    <>
      <Optional component={Button} {...buttonProps}>
        <Flex gap={theme.spacing[1]} align="center">
          {AvatarMarkup}
          <Flex column>
            {NameMarkup}
            {BlurbMarkup}
          </Flex>
        </Flex>
      </Optional>
      <ChannelModal {...modalProps} />
    </>
  );
}

export const Channel = Object.assign(ChannelBase, {
  Skeleton,
  displayName: "ChannelInfo",
});
