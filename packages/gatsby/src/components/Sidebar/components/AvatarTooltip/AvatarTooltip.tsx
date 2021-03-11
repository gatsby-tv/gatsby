import React, { useRef } from "react";
import { Flex, Avatar, Tooltip, TextMeta, Button } from "@gatsby-tv/components";
import { ChannelHandle, useTheme, useModal } from "@gatsby-tv/utilities";
import { Channel } from "@gatsby-tv/types";

import { ChannelModal } from "@src/components/ChannelModal";

export interface AvatarTooltipProps {
  channel: Channel;
}

export function AvatarTooltip(props: AvatarTooltipProps): React.ReactElement {
  const { channel } = props;
  const theme = useTheme();
  const ref = useRef<HTMLButtonElement>(null);
  const { active, activate, deactivate } = useModal();

  return (
    <>
      <Button ref={ref} unstyled onClick={activate}>
        <Avatar src={channel.avatar} size={theme.avatar.small} />
      </Button>
      <Tooltip for={ref} placement="right">
        <Flex column>
          <TextMeta font={theme.font[4]} heading bold>
            {channel.name}
          </TextMeta>
          <TextMeta font={theme.font[4]}>
            {ChannelHandle(channel.handle)}
          </TextMeta>
        </Flex>
      </Tooltip>
      <ChannelModal channel={channel} active={active} onExit={deactivate} />
    </>
  );
}
