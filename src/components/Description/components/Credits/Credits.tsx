import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Scroll,
  Icon,
  TextSubheading,
  Modal,
  Rule,
} from "@gatsby-tv/components";
import {
  ChannelAccount,
  UserAccount,
  Contributions,
  IPFSContent,
} from "@gatsby-tv/types";
import { Plus } from "@gatsby-tv/icons";
import {
  Value,
  ChannelHandle,
  UserHandle,
  ifExists,
  useTheme,
  useModal,
} from "@gatsby-tv/utilities";

import { ProfileLink } from "@src/components/ProfileLink";
import { AvatarCollation } from "@src/components/AvatarCollation";

type ChannelProps = {
  channel: ChannelAccount;
};

type CollaboratorProps = {
  compact?: boolean;
  collaborators: UserAccount[];
};

type ContributorProps = {
  compact?: boolean;
  contributors: UserAccount[];
  contributions: Contributions;
};

type SponsorProps = {
  compact?: boolean;
  sponsors: UserAccount[];
};

type CreditsBaseProps = {
  children?: React.ReactNode;
  title: string;
  compact?: boolean;
  avatars?: IPFSContent[];
};

export type CreditsProps =
  | ChannelProps
  | CollaboratorProps
  | ContributorProps
  | SponsorProps;

function isChannelProps(props: CreditsProps): props is ChannelProps {
  return (props as ChannelProps).channel !== undefined;
}

function isCollaboratorProps(props: CreditsProps): props is CollaboratorProps {
  return (props as CollaboratorProps).collaborators !== undefined;
}

function isContributorProps(props: CreditsProps): props is ContributorProps {
  return (props as ContributorProps).contributors !== undefined;
}

function CreditsBase(props: CreditsBaseProps): React.ReactElement | null {
  const theme = useTheme();
  const modal = useModal();

  const ProfileListMarkup = (
    <Flex column gap={theme.spacing.basetight}>
      <TextSubheading>{props.title}</TextSubheading>
      {props.children}
    </Flex>
  );

  const CompactMarkup = props.avatars ? (
    <Flex column gap={theme.spacing.basetight}>
      <TextSubheading>{props.title}</TextSubheading>
      <Box w="fit-width">
        <Button onClick={modal.activate} padding={theme.spacing.none}>
          <Flex gap={theme.spacing.basetight}>
            <AvatarCollation avatars={props.avatars.slice(0, 4)} />
            <Icon src={Plus} w="17px" />
          </Flex>
        </Button>
      </Box>
      <Modal fullscreen active={modal.active} onExit={modal.deactivate}>
        <Card bg={theme.colors.background[2]} padding={theme.spacing.loose}>
          <Box w="24rem" h="24rem">
            <Scroll>{ProfileListMarkup}</Scroll>
          </Box>
        </Card>
      </Modal>
    </Flex>
  ) : null;

  return props.compact ? CompactMarkup : ProfileListMarkup;
}

export function Credits(props: CreditsProps): React.ReactElement | null {
  if (isChannelProps(props)) {
    const { channel } = props;

    return (
      <CreditsBase title="Channel">
        <ProfileLink
          href={`/${channel.handle}`}
          avatar={channel.avatar}
          name={channel.name}
          handle={ChannelHandle(props.channel.handle)}
          verified={channel.verified}
          blurb={Value(channel.subscribers, "subscriber") as string}
        />
      </CreditsBase>
    );
  } else if (isCollaboratorProps(props)) {
    const { collaborators, compact } = props;
    const avatars = collaborators.map((collaborator) => collaborator.avatar);

    if (!collaborators.length) return null;

    return (
      <CreditsBase
        title={Value(collaborators.length, "Collaborator") as string}
        avatars={avatars}
        compact={compact}
      >
        {collaborators.map((collaborator, index) => (
          <ProfileLink
            key={index}
            href={`/u/${collaborator.handle}`}
            avatar={collaborator.avatar}
            name={collaborator.name}
            handle={UserHandle(collaborator.handle)}
            verified={collaborator.verified}
            blurb={Value(collaborator.followers, "follower") as string}
          />
        ))}
      </CreditsBase>
    );
  } else if (isContributorProps(props)) {
    const { contributors, contributions, compact } = props;
    const avatars = contributors.map((contributor) => contributor.avatar);

    if (!contributors.length) return null;

    return (
      <CreditsBase
        title={Value(contributors.length, "Contributor") as string}
        avatars={avatars}
        compact={compact}
      >
        {contributors.map((contributor, index) => (
          <ProfileLink
            key={index}
            href={`/u/${contributor.handle}`}
            avatar={contributor.avatar}
            name={contributor.name}
            handle={UserHandle(contributor.handle)}
            verified={contributor.verified}
            blurb={Array.from(contributions[contributor._id]).join(", ")}
          />
        ))}
      </CreditsBase>
    );
  } else {
    const { sponsors, compact } = props;
    const avatars = sponsors.map((sponsor) => sponsor.avatar);

    if (!sponsors.length) return null;

    return (
      <CreditsBase
        title={Value(sponsors.length, "Sponsor") as string}
        avatars={avatars}
        compact={compact}
      >
        {sponsors.map((sponsor, index) => (
          <ProfileLink
            key={index}
            href={`/u/${sponsor.handle}`}
            avatar={sponsor.avatar}
            name={sponsor.name}
            handle={UserHandle(sponsor.handle)}
            verified={sponsor.verified}
            blurb={Value(sponsor.followers, "follower") as string}
          />
        ))}
      </CreditsBase>
    );
  }
}
