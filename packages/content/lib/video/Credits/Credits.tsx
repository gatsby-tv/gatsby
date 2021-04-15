import React from "react";
import { Rule, Scroll, TextSubheading } from "@gatsby-tv/components";
import { Value } from "@gatsby-tv/utilities";
import { Video } from "@gatsby-tv/types";

import { Channel } from "@lib/channel";
import { User } from "@lib/user";
import { LinkProps } from "@lib/types";

import { Skeleton } from "./Credits.skeleton";
import styles from "./Credits.scss";

export interface CreditsProps {
  content?: Video;
  link?: React.FC<LinkProps>;
}

export function Credits(props: CreditsProps): React.ReactElement {
  const { content, link } = props;

  if (!content) return <Skeleton />;

  const CollaboratorsMarkup = content.collaborators.length
    ? content.collaborators.map((user, index) => (
        <User.Info
          key={`Collaborator.${user._id}`}
          user={user}
          blurb={Value(user.followers, "follower") as string}
          link={link}
        />
      ))
    : null;

  const ContributorsMarkup = content.contributors.length
    ? content.contributors.map((user, index) => (
        <User.Info
          key={`Contributor.${user._id}`}
          user={user}
          blurb={Array.from(content.contributions[user._id]).join(", ")}
          link={link}
        />
      ))
    : null;

  const SponsorsMarkup = content.sponsors.length
    ? content.sponsors.map((user, index) => (
        <User.Info
          key={`Sponsor.${user._id}`}
          user={user}
          blurb={Value(user.followers, "follower") as string}
          link={link}
        />
      ))
    : null;

  return (
    <Scroll className={styles.Credits}>
      <TextSubheading>Channel</TextSubheading>
      <Channel.Info
        channel={content.channel}
        blurb={Value(content.channel.subscribers, "subscriber")}
        link={link}
      />
      {(CollaboratorsMarkup || ContributorsMarkup || SponsorsMarkup) && (
        <Rule spacing="none" />
      )}
      {CollaboratorsMarkup && (
        <TextSubheading className={styles.Heading}>
          Collaborators
        </TextSubheading>
      )}
      {CollaboratorsMarkup}
      {ContributorsMarkup && (
        <TextSubheading className={styles.Heading}>Contributors</TextSubheading>
      )}
      {ContributorsMarkup}
      {SponsorsMarkup && (
        <TextSubheading className={styles.Heading}>Sponsors</TextSubheading>
      )}
      {SponsorsMarkup}
    </Scroll>
  );
}
