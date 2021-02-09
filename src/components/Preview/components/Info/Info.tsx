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
import { Value, ReleaseDate, useTheme, useModal } from "@gatsby-tv/utilities";

import { ListingFormat } from "@src/types";
import { ChannelModal } from "@src/components/ChannelModal";

export interface InfoProps {
  format: ListingFormat;
  channel: Channel;
  content: Content;
}

export function Info(props: InfoProps): React.ReactElement {
  const { format, channel, content } = props;
  const theme = useTheme();
  const modal = useModal();

  const date = isVideo(content) ? content.releaseDate : content.creationDate;

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
          <Box zIndex={2}>
            <Button unstyled onClick={modal.activate}>
              <TextMeta.Link bold>{channel.name}</TextMeta.Link>
            </Button>
          </Box>
          {VerifiedMarkup}
        </Optional>
        <ChannelModal {...modalProps} />
      </Box>
    ) : null;

  return (
    <Flex column>
      {NameMarkup}
      <TextMeta.List subdued>
        <TextMeta bold>{Value(content.views, "view")}</TextMeta>
        <TextMeta bold>{ReleaseDate(date)}</TextMeta>
      </TextMeta.List>
    </Flex>
  );
}
