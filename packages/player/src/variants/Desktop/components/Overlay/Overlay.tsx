import React, { useState, useEffect } from "react";
import { css } from "styled-components";
import { Activatable, Box, Flex, Icon } from "@gatsby-tv/components";
import {
  Play,
  Pause,
  SkipBackward,
  SkipForward,
  Spinner,
} from "@gatsby-tv/icons";
import { useTheme } from "@gatsby-tv/utilities";

import { Signal } from "@src/components/Signal";
import { cssCursorVisibility } from "@src/styles/cursor";
import { OverlayProps } from "@src/types";

export function Overlay(props: OverlayProps): React.ReactElement {
  const {
    active,
    loading,
    signal,
    controls: Controls,
    timeline: Timeline,
  } = props;
  const theme = useTheme();

  const overlayStyle = css`
    ${cssCursorVisibility(!active)}

    background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.9),
      rgba(0, 0, 0, 0.8) 5%,
      transparent 20%,
      transparent 80%,
      rgba(0, 0, 0, 0.5)
    );
  `;

  const overlayProps = {
    active,
    duration: 200,
    absolute: true,
    expand: true,
  };

  const loadingProps = {
    style: { transform: "rotate(-65deg)" },
    w: "116px",
    h: "116px",
    rounded: 1,
  };

  const timelineProps = {
    absolute: true,
    left: theme.spacing[2],
    right: theme.spacing[2],
    bottom: theme.spacing[4],
    onClick: (event: any) => event.stopPropagation(),
  };

  const controlsProps = {
    absolute: true,
    left: theme.spacing[2],
    right: theme.spacing[2],
    bottom: theme.spacing[0],
    onClick: (event: any) => event.stopPropagation(),
  };

  const LoadingMarkup =
    loading && !signal ? (
      <Flex absolute expand center>
        <Box {...loadingProps}>
          <Icon src={Spinner} />
        </Box>
      </Flex>
    ) : null;

  const TimelineMarkup = <Box {...timelineProps}>{Timeline}</Box>;
  const ControlsMarkup = <Box {...controlsProps}>{Controls}</Box>;

  return (
    <>
      {LoadingMarkup}
      <Signal signal={signal} size="52px" padding="32px" />
      <Activatable css={overlayStyle} {...overlayProps}>
        {ControlsMarkup}
        {TimelineMarkup}
      </Activatable>
    </>
  );
}
