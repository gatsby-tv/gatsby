import React from "react";
import {
  Box,
  Button,
  AvatarCollation,
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

import { Info } from "@src/components/Info";

type ChannelProps = {
  channel: Channel;
};

type CollaboratorProps = {
  collaborators: User[];
};

type ContributorProps = {
  contributors: User[];
  contributions: Contributions;
};

type SponsorProps = {
  sponsors: User[];
};

type CreditsBaseProps = {
  children?: React.ReactNode;
  title?: string;
  avatars?: (IPFSContent | string)[];
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
  const { children, title, avatars } = props;
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

  return avatars ? (
    <Flex column gap={theme.spacing[1]}>
      {TitleMarkup}
      {CollationMarkup}
      {ModalMarkup}
    </Flex>
  ) : ProfileListMarkup;
}

export function Credits(props: CreditsProps): React.ReactElement | null {
  if (isChannelProps(props)) {
    const { channel } = props;

    const accountProps = {
      channel,
      blurb: Value(channel.subscribers, "subscriber") as string,
      link: true,
    };

    return (
      <CreditsBase>
        <Info {...accountProps} />
      </CreditsBase>
    );
  } else if (isCollaboratorProps(props)) {
    const { collaborators } = props;
    const avatars = collaborators.map((collaborator) => collaborator.avatar);

    if (!collaborators.length) return null;

    const creditsProps = {
      title: Value(collaborators.length, "Collaborator") as string,
      avatars,
    };

    const AccountsMarkup = collaborators.map((user, index) => (
      <Info
        key={`${user._id}.${index}`}
        link
        user={user}
        blurb={Value(user.followers, "follower") as string}
      />
    ));

    return <CreditsBase {...creditsProps}>{AccountsMarkup}</CreditsBase>;
  } else if (isContributorProps(props)) {
    const { contributors, contributions } = props;
    const avatars = contributors.map((contributor) => contributor.avatar);

    if (!contributors.length) return null;

    const creditsProps = {
      title: Value(contributors.length, "Contributor") as string,
      avatars,
    };

    const AccountsMarkup = contributors.map((user, index) => (
      <Info
        key={`${user._id}.${index}`}
        link
        user={user}
        blurb={Array.from(contributions[user._id]).join(", ")}
      />
    ));

    return <CreditsBase {...creditsProps}>{AccountsMarkup}</CreditsBase>;
  } else {
    const { sponsors } = props;
    const avatars = sponsors.map((sponsor) => sponsor.avatar);

    if (!sponsors.length) return null;

    const creditsProps = {
      title: Value(sponsors.length, "Sponsor") as string,
      avatars,
    };

    const AccountsMarkup = sponsors.map((user, index) => (
      <Info
        key={`${user._id}.${index}`}
        link
        user={user}
        blurb={Value(user.followers, "follower") as string}
      />
    ));

    return <CreditsBase {...creditsProps}>{AccountsMarkup}</CreditsBase>;
  }
}
