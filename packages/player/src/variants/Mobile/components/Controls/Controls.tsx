import React from "react";
import { css } from "styled-components";
import { Box, TextBox, Flex, Grid, Icon, Button } from "@gatsby-tv/components";
import {
  Play,
  Pause,
  Previous,
  Next,
  Expand,
  Compress,
  SkipForward,
  SkipBackward,
  Spinner,
} from "@gatsby-tv/icons";
import { Time, ifNotExists, useTheme } from "@gatsby-tv/utilities";

import { ControlsProps } from "@src/types";

export function Controls(props: ControlsProps): React.ReactElement {
  const {
    paused,
    loading,
    fullscreen,
    prevVideo,
    nextVideo,
    setPlayback,
    setFullscreen,
    setSeek,
    setSignal,
  } = props;

  const theme = useTheme();

  const time = Time(props.time * props.duration);
  const duration = Time(props.duration);

  const playStyle = css`
    svg#gz-play {
      transform: translateX(2px);
    }
  `;

  const progressStyle = css`
    user-select: none;
    font-variant-numeric: tabular-nums;
  `;

  const prevProps = {
    animate: true,
    padding: theme.spacing[1],
    rounded: theme.border.radius.full,
    fg: ifNotExists(prevVideo, theme.colors.placeholder),
  };

  const nextProps = {
    animate: true,
    padding: theme.spacing[1],
    rounded: theme.border.radius.full,
    fg: ifNotExists(nextVideo, theme.colors.placeholder),
  };

  const playProps = {
    animate: true,
    padding: theme.spacing[2],
    rounded: theme.border.radius.full,
    onClick: () => setPlayback((current) => !current),
  };

  const backwardProps = {
    w: 1,
    h: 1,
    unstyled: true,
    onDblClick: () => {
      setSeek((current) => current - 5);
      setSignal("backward");
    },
  };

  const forwardProps = {
    w: 1,
    h: 1,
    unstyled: true,
    onDblClick: () => {
      setSeek((current) => current + 5);
      setSignal("forward");
    },
  };

  const progressProps = {
    padding: [theme.spacing[1], theme.spacing[2]],
    font: theme.font[6],
    weight: theme.weight.semiBold,
  };

  const fullscreenProps = {
    padding: [theme.spacing[1], theme.spacing[2]],
    onClick: () => setFullscreen((current) => !current),
  };

  const middleGridProps = {
    absolute: true,
    expand: true,
    center: true,
    template: `1fr ${theme.spacing[7]} ${theme.spacing[9]} ${theme.spacing[7]} 1fr`,
  };

  const bottomFlexProps = {
    absolute: true,
    w: 1,
    bottom: "16px",
    justify: "space-between",
    align: "center",
  };

  const PrevMarkup = (
    <Button {...prevProps}>
      <Icon src={Previous} w={theme.icon.small} />
    </Button>
  );

  const NextMarkup = (
    <Button {...nextProps}>
      <Icon src={Next} w={theme.icon.small} />
    </Button>
  );

  const PlayMarkup = !loading ? (
    <Button css={playStyle} {...playProps}>
      <Icon src={paused ? Play : Pause} w={theme.icon.larger} />
    </Button>
  ) : (
    <Icon src={Spinner} w={theme.icon.largest} />
  );

  const BackwardMarkup = <Button {...backwardProps} />;

  const ForwardMarkup = <Button {...forwardProps} />;

  const ProgressMarkup = (
    <TextBox as="span" css={progressStyle} {...progressProps}>
      {`${time} / ${duration}`}
    </TextBox>
  );

  const FullscreenMarkup = (
    <Button {...fullscreenProps}>
      <Icon src={fullscreen ? Compress : Expand} w={theme.icon.smallest} />
    </Button>
  );

  return (
    <>
      <Grid {...middleGridProps}>
        {BackwardMarkup}
        {PrevMarkup}
        {PlayMarkup}
        {NextMarkup}
        {ForwardMarkup}
      </Grid>
      <Flex {...bottomFlexProps}>
        {ProgressMarkup}
        {FullscreenMarkup}
      </Flex>
    </>
  );
}
