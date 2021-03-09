import React, { useState, useEffect } from "react";
import { css } from "styled-components";
import { Activatable, Flex, Box, Icon } from "@gatsby-tv/components";
import { ifNotExists, useTheme } from "@gatsby-tv/utilities";

import { Signal } from "@src/components/Signal";
import { OverlayProps } from "@src/types";

export function Overlay(props: OverlayProps): React.ReactElement {
  const {
    active,
    loading,
    scrubbing,
    signal,
    controls: Controls,
    timeline: Timeline,
  } = props;

  const theme = useTheme();
  const [controls, setControls] = useState(false);

  useEffect(() => {
    if (active) {
      const id = setTimeout(() => setControls(true), theme.duration.fastest);
      return () => clearTimeout(id);
    } else {
      setControls(false);
    }
  }, [active]);

  const controlsStyle = {
    pointerEvents: ifNotExists(controls, "none"),
  };

  const overlayProps = {
    active: active || scrubbing || loading,
    duration: theme.duration.fast,
    absolute: true,
    expand: true,
    bg: theme.colors.trueblack.fade(0.5),
  };

  const timelineProps = {
    absolute: true,
    left: theme.spacing[0],
    right: theme.spacing[0],
    bottom: theme.spacing[0],
    onPointerUp: (event: any) => event.stopPropagation(),
  };

  const controlsProps = {
    active: active && !scrubbing && !signal,
    duration: theme.duration.fastest,
    absolute: true,
    expand: true,
  };

  const signalProps = {
    signal,
    size: theme.icon.larger,
    padding: theme.spacing[1],
    zIndex: 2,
  };

  const TimelineMarkup = <Box {...timelineProps}>{Timeline}</Box>;
  const ControlsMarkup = (
    <Activatable css={controlsStyle} {...controlsProps}>
      {Controls}
    </Activatable>
  );

  return (
    <>
      <Signal {...signalProps} />
      <Activatable {...overlayProps}>{ControlsMarkup}</Activatable>
      {TimelineMarkup}
    </>
  );
}
