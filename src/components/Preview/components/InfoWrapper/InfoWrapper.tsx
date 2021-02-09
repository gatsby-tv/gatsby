import React from "react";
import { Flex, Avatar, Button } from "@gatsby-tv/components";
import { Channel } from "@gatsby-tv/types";
import { useTheme, useModal } from "@gatsby-tv/utilities";

import { ChannelModal } from "@src/components/ChannelModal";

export interface InfoWrapperProps {
  children?: React.ReactNode;
  channel: Channel;
  size: string;
}

export function InfoWrapper(props: InfoWrapperProps): React.ReactElement {
  const { children, channel, size } = props;
  const modal = useModal();
  const theme = useTheme();

  const modalProps = {
    channel,
    active: modal.active,
    onExit: modal.deactivate,
  };

  return (
    <Flex gap={theme.spacing[1]}>
      <Flex.Item shrink={0} h="fit-content" zIndex={2}>
        <Button unstyled onClick={modal.activate}>
          <Avatar src={channel.avatar} size={size} />
        </Button>
        <ChannelModal {...modalProps} />
      </Flex.Item>
      {children}
    </Flex>
  );
}
