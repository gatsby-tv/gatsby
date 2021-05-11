import React from "react";
import { Scroll, TextSubheading } from "@gatsby-tv/components";
import { Value } from "@gatsby-tv/utilities";
import { Video } from "@gatsby-tv/types";

import { User } from "@lib/user";
import { LinkProps } from "@lib/types";

import styles from "./Credits.scss";

export interface CreditsProps {
  content?: Video;
  link?: React.FC<LinkProps>;
}

export function Credits(props: CreditsProps): React.ReactElement | null {
  const { content, link } = props;

  if (
    !content ||
    (!content.collaborators.length &&
      !content.contributors.length &&
      !content.sponsors.length)
  )
    return null;

  const CollaboratorsMarkup = content.collaborators.length
    ? content.collaborators.map((user, index) => (
        <User.Info
          key={`Collaborator.${user._id}`}
          user={user}
          blurb={Value(user.followers, "follower")}
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
          blurb={Value(user.followers, "follower")}
          link={link}
        />
      ))
    : null;

  return (
    <Scroll className={styles.Credits}>
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
