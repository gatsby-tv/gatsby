import React from "react";
import {
  Flex,
  Box,
  Button,
  TextMeta,
  Optional,
  Icon,
} from "@gatsby-tv/components";
import { Channel, Content, isVideo } from "@gatsby-tv/types";
import { CheckmarkFill } from "@gatsby-tv/icons";
import {
  Value,
  ReleaseDate,
  useTheme,
  useModal,
  useUniqueId,
} from "@gatsby-tv/utilities";

import { ListingFormat } from "@src/types";
import { ChannelModal } from "@src/components/ChannelModal";

export interface InfoProps {
  format: ListingFormat;
  channel: Channel;
  content: Content;
}

export function Info(props: InfoProps): React.ReactElement {
  const { format, channel, content } = props;
  const titleId = useUniqueId("preview-description");
  const viewsId = useUniqueId("preview-description");
  const releaseId = useUniqueId("preview-description");
  const theme = useTheme();
  const modal = useModal();

  const date = new Date(
    isVideo(content) ? content.releaseDate : content.creationDate
  );

  const verifiedOptionalProps = {
    active: channel.verified,
    component: Flex,
    $props: { gap: theme.spacing[0.5] },
  };

  const modalProps = {
    channel,
    active: modal.active,
    onExit: modal.deactivate,
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

  const VerifiedMarkup = channel.verified ? (
    <Icon
      src={CheckmarkFill}
      w={theme.icon.smallest}
      fg={theme.colors.font.subdued}
    />
  ) : null;

  const NameMarkup =
    format !== "nochannel" ? (
      <Box css={{ lineHeight: theme.lineHeight.heading }}>
        <Optional {...verifiedOptionalProps}>
          <Button unstyled onClick={modal.activate} zIndex={2}>
            <TextMeta.Link id={titleId} bold data-description>
              {channel.name}
            </TextMeta.Link>
          </Button>
          {VerifiedMarkup}
        </Optional>
        <ChannelModal {...modalProps} />
      </Box>
    ) : null;

  return (
    <Flex column>
      {NameMarkup}
      <TextMeta.List subdued>
        <TextMeta.Data {...viewsProps}>
          {Value(content.views, "view")}
        </TextMeta.Data>
        <TextMeta.Time {...releaseProps}>{ReleaseDate(date)}</TextMeta.Time>
      </TextMeta.List>
    </Flex>
  );
}
