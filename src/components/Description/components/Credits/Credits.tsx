import React from "react";
import {
  Box,
  Button,
  Card,
  Flex,
  Scroll,
  Icon,
  TextSubheading,
  Modal,
} from "@gatsby-tv/components";
import { Channel, User, Contributions, IPFSContent } from "@gatsby-tv/types";
import { Plus } from "@gatsby-tv/icons";
import { Value, ifNotExists, useTheme, useModal } from "@gatsby-tv/utilities";

import { AccountLink } from "@src/components/AccountLink";
import { AvatarCollation } from "@src/components/AvatarCollation";

type ChannelProps = {
  compact?: boolean;
  channel: Channel;
};

type CollaboratorProps = {
  compact?: boolean;
  collaborators: User[];
};

type ContributorProps = {
  compact?: boolean;
  contributors: User[];
  contributions: Contributions;
};

type SponsorProps = {
  compact?: boolean;
  sponsors: User[];
};

type CreditsBaseProps = {
  children?: React.ReactNode;
  title?: string;
  avatars?: (IPFSContent | string)[];
  compact?: boolean;
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
  const { children, title, avatars, compact } = props;
  const theme = useTheme();
  const modal = useModal();

  const TitleMarkup = title ? <TextSubheading>{title}</TextSubheading> : null;

  const ProfileListMarkup = (
    <Flex column gap={theme.spacing[1]}>
      {TitleMarkup}
      {children}
    </Flex>
  );

  const CollationMarkup = avatars ? (
    <Box w="fit-width">
      <Button padding={theme.spacing[0]} onClick={modal.activate}>
        <Flex gap={theme.spacing[1]}>
          <AvatarCollation avatars={avatars.slice(0, 4)} />
          <Icon src={Plus} w="1.7rem" />
        </Flex>
      </Button>
    </Box>
  ) : null;

  const ModalMarkup = avatars ? (
    <Modal fullscreen active={modal.active} onExit={modal.deactivate}>
      <Card bg={theme.colors.background[2]} padding={theme.spacing[3]}>
        <Box w="30rem" h="40rem">
          <Scroll>{ProfileListMarkup}</Scroll>
        </Box>
      </Card>
    </Modal>
  ) : null;

  const CompactMarkup = avatars ? (
    <Flex column gap={theme.spacing[1]}>
      {TitleMarkup}
      {CollationMarkup}
      {ModalMarkup}
    </Flex>
  ) : null;

  return compact ? CompactMarkup : ProfileListMarkup;
}

export function Credits(props: CreditsProps): React.ReactElement | null {
  if (isChannelProps(props)) {
    const { channel, compact } = props;

    const accountProps = {
      channel,
      blurb: Value(channel.subscribers, "subscriber") as string,
    };

    return (
      <CreditsBase title={ifNotExists(compact, "Channel")}>
        <AccountLink {...accountProps} />
      </CreditsBase>
    );
  } else if (isCollaboratorProps(props)) {
    const { collaborators, compact } = props;
    const avatars = collaborators.map((collaborator) => collaborator.avatar);

    if (!collaborators.length) return null;

    const creditsProps = {
      title: Value(collaborators.length, "Collaborator") as string,
      avatars,
      compact,
    };

    const AccountsMarkup = collaborators.map((user, index) => (
      <AccountLink
        key={`${user._id}.${index}`}
        user={user}
        blurb={Value(user.followers, "follower") as string}
      />
    ));

    return <CreditsBase {...creditsProps}>{AccountsMarkup}</CreditsBase>;
  } else if (isContributorProps(props)) {
    const { contributors, contributions, compact } = props;
    const avatars = contributors.map((contributor) => contributor.avatar);

    if (!contributors.length) return null;

    const creditsProps = {
      title: Value(contributors.length, "Contributor") as string,
      avatars,
      compact,
    };

    const AccountsMarkup = contributors.map((user, index) => (
      <AccountLink
        key={`${user._id}.${index}`}
        user={user}
        blurb={Array.from(contributions[user._id]).join(", ")}
      />
    ));

    return <CreditsBase {...creditsProps}>{AccountsMarkup}</CreditsBase>;
  } else {
    const { sponsors, compact } = props;
    const avatars = sponsors.map((sponsor) => sponsor.avatar);

    if (!sponsors.length) return null;

    const creditsProps = {
      title: Value(sponsors.length, "Sponsor") as string,
      avatars,
      compact,
    };

    const AccountsMarkup = sponsors.map((user, index) => (
      <AccountLink
        key={`${user._id}.${index}`}
        user={user}
        blurb={Value(user.followers, "follower") as string}
      />
    ));

    return <CreditsBase {...creditsProps}>{AccountsMarkup}</CreditsBase>;
  }
}
