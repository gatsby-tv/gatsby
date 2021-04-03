import React from "react";
import {
  Avatar,
  Box,
  Flex,
  Button,
  Optional,
  TextMeta,
  Icon,
  DiscreteSize,
} from "@gatsby-tv/components";
import { CheckmarkFill } from "@gatsby-tv/icons";
import {
  ifExists,
  Value,
  ReleaseDate,
  useTheme,
  useModal,
  useUniqueId,
} from "@gatsby-tv/utilities";
import { Channel, Content as ContentType, isVideo } from "@gatsby-tv/types";

import { ChannelModal } from "@src/components/ChannelModal";

import { Skeleton, SkeletonProps, isSkeletonProps } from "./Skeleton";

export type { SkeletonProps as ContentSkeletonProps };
export { isSkeletonProps as isContentSkeletonProps };

export interface ContentProps {
  content: ContentType;
  channel?: boolean;
  avatar?: string;
}

export function isContentProps(props: any): props is ContentProps {
  return (props as ContentProps).content !== undefined;
}

function ContentBase(props: ContentProps): React.ReactElement {
  const { content, avatar } = props;
  const channel = props.channel ? content.channel : undefined;
  const theme = useTheme();
  const modal = useModal();
  const titleId = useUniqueId("content-info");
  const nameId = useUniqueId("content-info");
  const viewsId = useUniqueId("content-info");
  const releaseId = useUniqueId("content-info");

  const date = new Date(
    isVideo(content) ? content.releaseDate : content.creationDate
  );

  const avatarProps = {
    active: ifExists(avatar && channel),
    $props: { gap: theme.spacing[1] },
  };

  const titleProps = {
    id: titleId,
    bold: true,
    heading: true,
    clamp: 2,
    font: theme.font[4],
    "data-label": true,
  };

  const verifiedProps = {
    active: ifExists(channel?.verified),
    $props: { gap: theme.spacing[0.5] },
  };

  const viewsProps = {
    id: viewsId,
    value: content.views,
    bold: true,
    "data-description": true,
  };

  const releaseProps = {
    id: releaseId,
    date,
    bold: true,
    "data-description": true,
  };

  const AvatarMarkup =
    avatar && channel ? (
      <Flex shrink={0} h="fit-content" zIndex={2}>
        <Button unstyled onClick={modal.activate}>
          <Avatar src={channel.avatar} size={avatar} />
        </Button>
      </Flex>
    ) : null;

  const VerifiedMarkup = channel?.verified ? (
    <Icon
      src={CheckmarkFill}
      w={theme.icon.smallest}
      fg={theme.colors.font.subdued}
    />
  ) : null;

  const NameMarkup = channel ? (
    <Box css={{ lineHeight: theme.lineHeight.heading }}>
      <Optional component={Flex} {...verifiedProps}>
        <Button unstyled zIndex={2} onClick={modal.activate}>
          <TextMeta.Link id={nameId} bold data-description>
            {channel.name}
          </TextMeta.Link>
        </Button>
        {VerifiedMarkup}
      </Optional>
    </Box>
  ) : null;

  const ChannelModalMarkup = channel ? (
    <ChannelModal
      channel={channel}
      active={modal.active}
      onExit={modal.deactivate}
    />
  ) : null;

  return (
    <Optional component={Flex} {...avatarProps}>
      {AvatarMarkup}
      <Flex column gap={ifExists(channel, theme.spacing[0.5])}>
        <TextMeta {...titleProps}>{content.title}</TextMeta>
        <Flex column>
          {NameMarkup}
          <TextMeta.List subdued>
            <TextMeta.Data {...viewsProps}>
              {Value(content.views, "view")}
            </TextMeta.Data>
            <TextMeta.Time {...releaseProps}>{ReleaseDate(date)}</TextMeta.Time>
          </TextMeta.List>
        </Flex>
      </Flex>
      {ChannelModalMarkup}
    </Optional>
  );
}

export const Content = Object.assign(ContentBase, {
  Skeleton,
  displayName: "ContentInfo",
});
