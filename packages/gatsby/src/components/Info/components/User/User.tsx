import React from "react";
import { Avatar, Box, Flex, Icon, Optional, TextMeta } from "@gatsby-tv/components";
import { CheckmarkFill } from "@gatsby-tv/icons";
import { ReleaseDate, UserHandle, ifExists, useTheme } from "@gatsby-tv/utilities";
import { User as UserType } from "@gatsby-tv/types";
import { Link } from "@gatsby-tv/next";

import { Skeleton, SkeletonProps, isSkeletonProps } from "./Skeleton";

export type { SkeletonProps as UserSkeletonProps };
export { isSkeletonProps as isUserSkeletonProps };

export interface UserProps {
  user: UserType,
  blurb?: string | string[];
  link?: boolean;
}

export function isUserProps(props: any): props is UserProps {
  return (props as UserProps).user !== undefined;
}

function UserBase(props: UserProps): React.ReactElement {
  const theme = useTheme();
  const {
    user,
    link,
    blurb = `Joined ${ReleaseDate(props.user.creationDate)}`
  } = props;

  const verifiedProps = {
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
    <Optional component={Flex} {...verifiedProps}>
      <TextMeta bold font={theme.font[4]}>
        {user.name}
      </TextMeta>
      {VerifiedMarkup}
    </Optional>
  );

  const HandleMarkup = (
    <TextMeta subdued bold font={theme.font[5]}>
      {UserHandle(user.handle)}
    </TextMeta>
  );

  const BlurbMarkup = typeof blurb === "string" ? (
    <TextMeta subdued bold font={theme.font[5]}>
      {blurb}
    </TextMeta>
  ) : (
    <TextMeta.List subdued bold font={theme.font[5]}>
      {blurb.map((item, index) => (
        <TextMeta key={`meta.${index}`}>{item}</TextMeta>
      ))}
    </TextMeta.List>
  );

  const LinkMarkup = link ? (
    <Link href={`/u/${user.handle}`}>
      <Box absolute expand zIndex={1} />
    </Link>
  ) : null;

  return (
    <Flex gap={theme.spacing[1]} align="center">
      {AvatarMarkup}
      <Flex column>
        {NameMarkup}
        {HandleMarkup}
        {BlurbMarkup}
      </Flex>
      {LinkMarkup}
    </Flex>
  );
}

export const User = Object.assign(UserBase, {
  Skeleton,
  displayName: "UserInfo",
});
