import React, { useState, forwardRef } from "react";
import { usePopper } from "react-popper";
import styled from "styled-components";
import { useTheme, Time } from "@gatsby-tv/utilities";

import { EventHandler } from "@lib/types";
import { Box } from "@lib/components/Box";
import { Activatable } from "@lib/components/Activatable";
import { cssTextTimeline } from "@lib/styles/typography";

const TimelineStyle = styled(Box)`
  cursor: pointer;
  transition: transform 150ms ease;

  &:hover {
    transform: scaleY(1.5);

    [data-progress-ball] {
      transform: scale(1, 0.66);
    }
  }

  &:before {
    content: "";
    position: absolute;
    top: -10px;
    right: 0;
    left: 0;
    height: 20px;
  }
`;

export interface TimelineProps {
  time: number;
  progress: number;
  position: number;
  duration: number;
  active?: boolean;
  onClick?: EventHandler;
  onPointerDown?: EventHandler;
  onPointerUp?: EventHandler;
  onPointerEnter?: EventHandler;
  onPointerMove?: EventHandler;
  onPointerLeave?: EventHandler;
}

export const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  (props: TimelineProps, ref) => {
    const theme = useTheme();
    const [reference, setReference] = useState<HTMLDivElement | null>(null);
    const [popper, setPopper] = useState<HTMLDivElement | null>(null);

    const { time, progress, position, duration, active, ...events } = props;

    const { styles, attributes } = usePopper(reference, popper, {
      placement: "top",
      strategy: "absolute",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 15],
          },
        },
      ],
    });

    const progressBallStyle = {
      borderRadius: "100%",
      transition: "transform 150ms ease",
      transform: "scale(0)",
    };

    const progressBallBoxProps = {
      "data-progress-ball": true,
      absolute: true,
      top: -1.37,
      right: "-7px",
      w: "14px",
      h: "14px",
      bg: theme.colors.gold,
    };

    const progressBufferProps = {
      style: { right: `${100 * (1 - progress)}%` },
      absolute: true,
      expand: true,
      bg: theme.colors.white.fade(0.85),
    };

    const progressProps = {
      style: { right: `${100 * (1 - time)}%` },
      absolute: true,
      expand: true,
      bg: theme.colors.gold,
    };

    const timelineProps = {
      ref,
      h: "4px",
      bg: theme.colors.white.fade(0.85),
      ...events,
    };

    const popperProps = {
      ref: setPopper,
      style: styles.popper,
      active,
      duration: 150,
      ...attributes.popper,
    };

    const ProgressMarkup = (
      <>
        <Box {...progressBufferProps} />
        <Box {...progressProps}>
          <Box css={progressBallStyle} {...progressBallBoxProps} />
        </Box>
      </>
    );

    return (
      <>
        <TimelineStyle {...timelineProps}>{ProgressMarkup}</TimelineStyle>
        <Box style={{ right: `${100 * (1 - position)}%` }} absolute>
          <Box ref={setReference} />
          <Activatable css={cssTextTimeline} {...popperProps}>
            {Time(position * duration)}
          </Activatable>
        </Box>
      </>
    );
  }
);
