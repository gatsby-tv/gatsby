import React, { useRef } from "react";
import {
  Box,
  Button,
  Scroll,
  Image,
  Icon,
  Modal,
  Card,
} from "@gatsby-tv/components";
import { Channel } from "@gatsby-tv/types";
import { Cancel } from "@gatsby-tv/icons";
import { useFrame, useTheme } from "@gatsby-tv/utilities";

import { ChannelContent } from "@src/components/ChannelContent";

import { BannerOverlay } from "./components/BannerOverlay";
import { ResetScroll } from "./components/ResetScroll";

export interface ChannelModalProps {
  channel: Channel;
  active?: boolean;
  onExit?: () => void;
}

export function ChannelModal(props: ChannelModalProps): React.ReactElement {
  const { channel, active, onExit } = props;
  const container = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const { screen } = useFrame();

  const cardProps = {
    ref: container,
    bg: theme.colors.background[2],
    w: "min(80vw, 90rem)",
    h: "calc(100vh - 12rem)",
  };

  const cancelBoxProps = {
    absolute: true,
    top: theme.spacing[1.5],
    right: theme.spacing[1.5],
    zIndex: 2,
  };

  const cancelProps = {
    rounded: theme.border.radius.full,
    bg: theme.colors.inverted[5].darken(0.6).fade(0.2),
    highlight: theme.colors.inverted[5].darken(0.5).fade(0.2),
    onClick: onExit,
  };

  const bannerProps = {
    src: channel.banner,
    aspectRatio: 0.5,
    overlay: <BannerOverlay channel={channel} />,
  };

  return (
    <Modal id="channel" fullscreen active={active} onExit={onExit}>
      <Card {...cardProps}>
        <Box {...cancelBoxProps}>
          <Button {...cancelProps}>
            <Icon src={Cancel} w={theme.icon.smaller} />
          </Button>
        </Box>
        <Scroll smooth hide>
          <Image {...bannerProps} />
          <Box margin={[theme.spacing[0], theme.spacing[3]]}>
            <ChannelContent channel={channel} groups={2} />
          </Box>
          <ResetScroll container={container} />
        </Scroll>
      </Card>
    </Modal>
  );
}
