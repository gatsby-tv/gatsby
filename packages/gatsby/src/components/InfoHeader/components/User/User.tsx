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
import { FullValue, UserHandle, ifExists, useTheme } from "@gatsby-tv/utilities";
import { User as UserType } from "@gatsby-tv/types";

import { Link } from "@src/components/Link";

import { Skeleton, SkeletonProps, isSkeletonProps } from "./Skeleton";

export type { SkeletonProps as UserSkeletonProps };
export { isSkeletonProps as isUserSkeletonProps };

export interface UserProps {
  user: UserType;
  blurb?: string | string[];
  link?: boolean;
}

export function isUserProps(
  props: any
): props is UserProps {
  return (props as UserProps).user !== undefined;
}

function UserBase(props: UserProps): React.ReactElement {
  const theme = useTheme();
  const { user, link, blurb = [UserHandle(user.handle), FullValue(user.followers, "follower")] } = props;

  const verifiedProps = {
    active: user.verified,
    $props: { gap: theme.spacing[1] },
  };

  const linkBoxProps = {
    active: ifExists(link),
    $props: { w: "fit-content" },
  };

  const linkProps = {
    active: ifExists(link),
    $props: {
      href: `/u/${user.handle}`,
      $props: {
        underline: true,
      },
    },
  };

  const AvatarMarkup = (
    <Flex.Item shrink={0}>
      <Avatar src={user.avatar} size={theme.avatar.largest} />
    </Flex.Item>
  );

  const VerifiedMarkup = user.verified ? (
    <Icon src={CheckmarkFill} w={theme.icon.smaller} />
  ) : null;

  const NameMarkup = (
    <Optional component={Flex} {...verifiedProps}>
      <Optional component={Box} {...linkBoxProps}>
        <Optional component={Link} {...linkProps}>
          <TextDisplay>{user.name}</TextDisplay>
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

export const User = Object.assign(UserBase, {
  Skeleton,
  displayName: "UserInfoHeader",
});
