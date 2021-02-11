import React from "react";
import {
  Avatar,
  Box,
  Button,
  Icon,
  Flex,
  Optional,
  TextMeta,
} from "@gatsby-tv/components";
import { User, Channel } from "@gatsby-tv/types";
import { CheckmarkFill } from "@gatsby-tv/icons";
import {
  UserHandle,
  ChannelHandle,
  ReleaseDate,
  ifExists,
  useTheme,
  useModal,
} from "@gatsby-tv/utilities";

import { ChannelModal } from "@src/components/ChannelModal";
import { Link, LinkProps } from "@src/components/Link";

type UserProps = Omit<LinkProps, "href"> & {
  user: User;
  blurb?: string;
};

type ChannelProps = {
  channel: Channel;
  blurb?: string;
};

export type AccountLinkProps = UserProps | ChannelProps;

function UserLink(props: UserProps): React.ReactElement {
  const theme = useTheme();
  const {
    user,
    blurb = `Joined ${ReleaseDate(props.user.creationDate)}`,
    ...linkProps
  } = props;

  const verifiedOptionalProps = {
    active: ifExists(user.verified),
    $props: { gap: theme.spacing[0.5] },
  };

  const AvatarMarkup = (
    <Flex.Item shrink={0}>
      <Avatar src={user.avatar} size={theme.avatar.larger} />
    </Flex.Item>
  );

  const VerifiedMarkup = user.verified ? (
    <Icon src={CheckmarkFill} w={theme.icon.smallest} />
  ) : null;

  const NameMarkup = (
    <Optional component={Flex} {...verifiedOptionalProps}>
      <TextMeta bold font="medium">
        {user.name}
      </TextMeta>
      {VerifiedMarkup}
    </Optional>
  );

  const HandleMarkup = (
    <TextMeta subdued bold font="small">
      {UserHandle(user.handle)}
    </TextMeta>
  );

  const BlurbMarkup = (
    <TextMeta subdued bold font="small">
      {blurb}
    </TextMeta>
  );

  const LinkMarkup = (
    <Link href={`/u/${user.handle}`} {...linkProps}>
      <Box absolute expand zIndex={1} />
    </Link>
  );

  return (
    <Flex gap={theme.spacing[1]} align="center">
      {AvatarMarkup}
      <Flex column gap={theme.spacing[0]}>
        {NameMarkup}
        {HandleMarkup}
        {BlurbMarkup}
      </Flex>
      {LinkMarkup}
    </Flex>
  );
}

function ChannelLink(props: ChannelProps): React.ReactElement {
  const theme = useTheme();
  const { active, activate, deactivate } = useModal();
  const {
    channel,
    blurb = `Created ${ReleaseDate(props.channel.creationDate)}`,
  } = props;

  const verifiedOptionalProps = {
    active: ifExists(channel.verified),
    component: Flex,
    $props: { gap: theme.spacing[0.5] },
  };

  const AvatarMarkup = (
    <Flex.Item shrink={0}>
      <Avatar src={channel.avatar} size={theme.avatar.larger} />
    </Flex.Item>
  );

  const VerifiedMarkup = channel.verified ? (
    <Icon src={CheckmarkFill} w={theme.icon.smallest} />
  ) : null;

  const NameMarkup = (
    <Optional {...verifiedOptionalProps}>
      <TextMeta bold font="medium">
        {channel.name}
      </TextMeta>
      {VerifiedMarkup}
    </Optional>
  );

  const HandleMarkup = (
    <TextMeta subdued bold font="small">
      {ChannelHandle(channel.handle)}
    </TextMeta>
  );

  const BlurbMarkup = (
    <TextMeta subdued bold font="small">
      {blurb}
    </TextMeta>
  );

  return (
    <>
      <Button unstyled onClick={activate}>
        <Flex gap={theme.spacing[1]} align="center">
          {AvatarMarkup}
          <Flex column gap={theme.spacing[0]}>
            {NameMarkup}
            {HandleMarkup}
            {BlurbMarkup}
          </Flex>
        </Flex>
      </Button>
      <ChannelModal channel={channel} active={active} onExit={deactivate} />
    </>
  );
}

export function AccountLink(props: AccountLinkProps): React.ReactElement {
  if ((props as UserProps).user !== undefined) {
    return <UserLink {...(props as UserProps)} />;
  } else {
    return <ChannelLink {...(props as ChannelProps)} />;
  }
}
