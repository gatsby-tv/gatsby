import React from "react";
import {
  Avatar,
  Box,
  Icon,
  Flex,
  Optional,
  TextMeta,
} from "@gatsby-tv/components";
import { IPFSContent } from "@gatsby-tv/types";
import { CheckmarkFill } from "@gatsby-tv/icons";
import {
  ReleaseDate,
  ifExists,
  useTheme,
  useIPFSContent,
} from "@gatsby-tv/utilities";

import { Link, LinkProps } from "@src/components/Link";

type DateProps = LinkProps & {
  avatar: IPFSContent;
  name: string;
  creationDate: Date;
  verified?: boolean;
};

type BlurbProps = Omit<DateProps, "creationDate"> & { blurb: string };

export type ProfileLinkProps = DateProps | BlurbProps;

function isBlurbProps(props: ProfileLinkProps): props is BlurbProps {
  return (props as BlurbProps).blurb !== undefined;
}

function parseBlurbProps(props: BlurbProps): [string, linkProps] {
  const { blurb, ...linkProps } = props;
  return [blurb, linkProps];
}

function parseDateProps(props: DateProps): [string, linkProps] {
  const { date, ...linkProps } = props;
  return [`Joined ${ReleaseDate(date)}`, linkProps];
}

export function ProfileLink(props: ProfileLinkProps): React.ReactElement {
  const theme = useTheme();
  const { url: avatar } = useIPFSContent(props.avatar);
  const [blurb, linkProps] = isBlurbProps(props)
    ? parseBlurbProps(props)
    : parseDateProps(props);

  const verifiedMarkup = props.verified ? (
    <Icon src={CheckmarkFill} w={theme.icon.extraSmall} />
  ) : null;

  return (
    <Flex gap={theme.spacing.tight} align="center">
      <Flex.Item shrink={0}>
        <Avatar src={avatar} size={theme.avatar.large} />
      </Flex.Item>
      <Flex column gap={theme.spacing.none}>
        <Optional
          active={ifExists(props.verified)}
          component={Flex}
          $props={{ gap: theme.spacing.extraTight }}
        >
          <TextMeta bold font="medium">
            {props.name}
          </TextMeta>
          {verifiedMarkup}
        </Optional>
        <TextMeta subdued bold font="small">
          {blurb}
        </TextMeta>
      </Flex>
      <Link {...linkProps}>
        <Box absolute expand zIndex={1} />
      </Link>
    </Flex>
  );
}
