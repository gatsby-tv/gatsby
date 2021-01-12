import React from "react";
import {
  Avatar,
  Flex,
  Scroll,
  TextSubheading,
  Rule,
} from "@gatsby-tv/components";
import { ChannelAccount, UserAccount, Contributions } from "@gatsby-tv/types";
import { Value, ifExists, useTheme } from "@gatsby-tv/utilities";

import { ProfileLink } from "@src/components/ProfileLink";

export interface CreditsProps {
  channel: ChannelAccount;
  collaborators: UserAccount[];
  contributors: UserAccount[];
  contributions: Contributions;
  sponsors: UserAccount[];
}

export function Credits(props: CreditsProps): React.ReactElement {
  const {
    channel,
    collaborators,
    contributors,
    contributions,
    sponsors,
  } = props;

  const theme = useTheme();

  const collaboratorLinks = collaborators.map((collaborator, index) => (
    <ProfileLink
      key={index}
      href={`/u/${collaborator.handle}`}
      avatar={collaborator.avatar}
      name={collaborator.name}
      verified={collaborator.verified}
      blurb={Value(collaborator.followers, "follower")}
    />
  ));

  const contributorLinks = contributors.map((contributor, index) => (
    <ProfileLink
      key={index}
      href={`/u/${contributor.handle}`}
      avatar={contributor.avatar}
      name={contributor.name}
      verified={contributor.verified}
      blurb={Array.from(contributions[contributor._id]).join(", ")}
    />
  ));

  const sponsorLinks = sponsors.map((sponsor, index) => (
    <ProfileLink
      key={index}
      href={`/u/${sponsor.handle}`}
      avatar={sponsor.avatar}
      name={sponsor.name}
      verified={sponsor.verified}
      blurb={Value(sponsor.followers, "follower")}
    />
  ));

  return (
    <Scroll>
      <Flex
        column
        gap={theme.spacing.baseTight}
        paddingRight={theme.spacing.tight}
      >
        <Flex column gap={theme.spacing.baseTight}>
          <TextSubheading>Channel</TextSubheading>
          <ProfileLink
            href={`/${channel.handle}`}
            avatar={channel.avatar}
            name={channel.name}
            verified={channel.verified}
            blurb={Value(channel.subscribers, "subscriber")}
          />
        </Flex>
        {ifExists(collaborators.length) && (
          <>
            <Rule thin />
            <Flex column gap={theme.spacing.baseTight}>
              <TextSubheading>Collaborators</TextSubheading>
              {collaboratorLinks}
            </Flex>
          </>
        )}
        {ifExists(contributors.length) && (
          <>
            <Rule thin />
            <Flex column gap={theme.spacing.baseTight}>
              <TextSubheading>Contributors</TextSubheading>
              {contributorLinks}
            </Flex>
          </>
        )}
        {ifExists(sponsors.length) && (
          <>
            <Rule thin />
            <Flex column gap={theme.spacing.baseTight}>
              <TextSubheading>Sponsors</TextSubheading>
              {sponsorLinks}
            </Flex>
          </>
        )}
      </Flex>
    </Scroll>
  );
}
