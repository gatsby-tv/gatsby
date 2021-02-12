import React, { useRef } from "react";
import {
  Play,
  Pause,
  Next,
  Playlist,
  Expand,
  Compress,
} from "@gatsby-tv/icons";
import { useTheme, Time } from "@gatsby-tv/utilities";

import { Box } from "@lib/components/Box";
import { TextBox } from "@lib/components/TextBox";
import { Flex } from "@lib/components/Flex";
import { Icon } from "@lib/components/Icon";
import { Button } from "@lib/components/Button";

export interface ControlsProps {
  paused: boolean;
  fullscreen?: boolean;
  position: number;
  duration: number;
  nextVideo?: unknown;
  playlist?: unknown;
  togglePlayback: () => void;
  toggleFullscreen?: () => void;
}

export function Controls(props: ControlsProps): React.ReactElement {
  const {
    paused,
    fullscreen,
    position,
    nextVideo,
    playlist,
    togglePlayback,
    toggleFullscreen,
  } = props;

  const theme = useTheme();
  const noop = () => null;
  const play = useRef<HTMLButtonElement>(null);

  const progress = Time(position * props.duration);
  const duration = Time(props.duration);

  const progressStyle = {
    fontVariantNumeric: "tabular-nums",
  };

  const progressProps = {
    font: theme.font[4],
    weight: theme.weight.semiBold,
  };

  const ProgressMarkup = (
    <TextBox as="span" css={progressStyle} {...progressProps}>
      {`${progress} / ${duration}`}
    </TextBox>
  );

  const PlayMarkup = (
    <Button ref={play} onClick={togglePlayback}>
      <Box paddingRight={theme.spacing[0.5]}>
        <Icon src={paused ? Play : Pause} w={theme.icon.small} />
      </Box>
    </Button>
  );

  const NextMarkup = nextVideo ? (
    <Button onClick={noop}>
      <Icon src={Next} w="17px" />
    </Button>
  ) : null;

  const PlaylistMarkup = playlist ? (
    <Button onClick={noop}>
      <Icon src={Playlist} w={theme.icon.base} />
    </Button>
  ) : null;

  const FullscreenMarkup = (
    <Button onClick={toggleFullscreen}>
      <Icon src={fullscreen ? Compress : Expand} w={theme.icon.small} />
    </Button>
  );

  return (
    <Flex align="stretch" h="39px">
      <Flex.Item grow={1}>
        <Flex expand justify="flex-start" align="stretch">
          {PlayMarkup}
          {NextMarkup}
          {PlaylistMarkup}
          <Flex center paddingLeft={theme.spacing[0.5]}>
            {ProgressMarkup}
          </Flex>
        </Flex>
      </Flex.Item>
      <Flex.Item grow={1}>
        <Flex expand justify="flex-end" align="center">
          {FullscreenMarkup}
        </Flex>
      </Flex.Item>
    </Flex>
  );
}
