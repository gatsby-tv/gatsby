import React from "react";
import { css } from "styled-components";
import { Box, TextBox, Flex, Icon, Button } from "@gatsby-tv/components";
import {
  Play,
  Pause,
  Previous,
  Next,
  Playlist,
  Expand,
  Compress,
} from "@gatsby-tv/icons";
import { useTheme, Time } from "@gatsby-tv/utilities";

import { ControlsProps } from "@src/types";

export function Controls(props: ControlsProps): React.ReactElement {
  const {
    paused,
    fullscreen,
    prevVideo,
    nextVideo,
    playlist,
    setPlayback,
    setFullscreen,
  } = props;

  const theme = useTheme();

  const time = Time(props.time * props.duration);
  const duration = Time(props.duration);

  const progressStyle = css`
    user-select: none;
    font-variant-numeric: tabular-nums;
  `;

  const progressProps = {
    font: theme.font[4],
    weight: theme.weight.semiBold,
  };

  const ProgressMarkup = (
    <TextBox as="span" css={progressStyle} {...progressProps}>
      {`${time} / ${duration}`}
    </TextBox>
  );

  const PlayMarkup = (
    <Button onClick={() => setPlayback((current) => !current)}>
      <Box paddingRight={theme.spacing[0.5]}>
        <Icon src={paused ? Play : Pause} w={theme.icon.small} />
      </Box>
    </Button>
  );

  const PrevMarkup = prevVideo ? (
    <Button>
      <Icon src={Previous} w="17px" />
    </Button>
  ) : null;

  const NextMarkup = nextVideo ? (
    <Button>
      <Icon src={Next} w="17px" />
    </Button>
  ) : null;

  const PlaylistMarkup = playlist ? (
    <Button>
      <Icon src={Playlist} w={theme.icon.base} />
    </Button>
  ) : null;

  const FullscreenMarkup = (
    <Button onClick={() => setFullscreen((current) => !current)}>
      <Icon src={fullscreen ? Compress : Expand} w={theme.icon.small} />
    </Button>
  );

  return (
    <Flex align="stretch" h="39px">
      <Flex.Item grow={1}>
        <Flex expand justify="flex-start" align="stretch">
          {PlayMarkup}
          {PrevMarkup}
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
