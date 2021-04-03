import React, { useRef, useState, useCallback } from "react";
import {
  Box,
  Button,
  Scroll,
  Image,
  Icon,
  Panel,
  Portal,
} from "@gatsby-tv/components";
import { Channel } from "@gatsby-tv/types";
import { ExtendLeft } from "@gatsby-tv/icons";
import { useFrame, useTheme } from "@gatsby-tv/utilities";

import { ChannelContent } from "@src/components/ChannelContent";
import { usePageMargin } from "@src/utilities/use-page-margin";

import { BannerOverlay } from "./components/BannerOverlay";
import { ResetScroll } from "./components/ResetScroll";

export interface ChannelModalProps {
  channel: Channel;
  active?: boolean;
  onExit?: () => void;
}

export function ChannelModal(props: ChannelModalProps): React.ReactElement {
  const { channel, active, onExit } = props;
  const [scrolling, setScrolling] = useState<number | undefined>();
  const container = useRef<HTMLDivElement>(null);
  const margin = usePageMargin();
  const theme = useTheme();

  const onScroll = useCallback(
    (event: any) => {
      if (scrolling !== undefined) {
        clearTimeout(scrolling);
      }

      const id = setTimeout(setScrolling, 150);
      setScrolling(id);
    },
    [scrolling]
  );

  const cancelBoxProps = {
    absolute: true,
    top: theme.spacing[1.5],
    left: theme.spacing[1.5],
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

  const boxProps = {
    margin: [
      theme.spacing[0.5],
      margin ? theme.spacing[0] : theme.spacing[1.5],
    ],
  };

  return (
    <Panel fullscreen draggable={!scrolling} active={active} onExit={onExit}>
      <Box ref={container} expand bg={theme.colors.background[2]}>
        <Box {...cancelBoxProps}>
          <Button {...cancelProps}>
            <Icon src={ExtendLeft} w={theme.icon.smaller} />
          </Button>
        </Box>
        <Scroll smooth hide onScroll={onScroll}>
          <Image {...bannerProps} />
          <Box {...boxProps}>
            <ChannelContent channel={channel} groups={margin ? 1 : 2} />
          </Box>
          <ResetScroll container={container} />
        </Scroll>
      </Box>
    </Panel>
  );
}
