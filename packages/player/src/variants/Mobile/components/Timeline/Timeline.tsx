import React, { useState, useCallback, forwardRef, Ref } from "react";
import { css } from "styled-components";
import { usePopper } from "react-popper";
import { Activatable, Box, TextBox, Flex } from "@gatsby-tv/components";
import {
  Time,
  ifExists,
  useTheme,
  useForwardedRef,
} from "@gatsby-tv/utilities";

import { TimelineProps } from "@src/types";

export const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  (props: TimelineProps, ref: Ref<HTMLDivElement>) => {
    const {
      active,
      position,
      scrubbing,
      time,
      progress,
      duration,
      onSeek,
    } = props;

    const timeline = useForwardedRef<HTMLDivElement>(ref);

    const theme = useTheme();
    const [reference, setReference] = useState<HTMLDivElement | null>(null);
    const [popper, setPopper] = useState<HTMLDivElement | null>(null);

    const { styles, attributes, update = () => undefined }: any = usePopper(
      reference,
      popper,
      {
        placement: "top",
        strategy: "absolute",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 25],
            },
          },
          {
            name: "preventOverflow",
            options: {
              tether: false,
              padding: 4,
            },
          },
        ],
      }
    );

    const timelineStyle = css`
      &:before {
        content: "";
        position: absolute;
        top: -12px;
        right: 0;
        bottom: -12px;
        left: 0;
      }
    `;

    const ballStyle = css`
      transition: transform 150ms ease;
      transform: scale(0);

      &[data-active] {
        transform: scale(1);
      }

      &[data-scrubbing] {
        transform: scale(1.25);
      }
    `;

    const bufferProps = {
      style: { right: `${100 * (1 - progress)}%` },
      absolute: true,
      expand: true,
      bg: theme.colors.white.fade(0.85),
    };

    const progressProps = {
      style: { right: `${100 * (1 - (scrubbing ? position : time))}%` },
      absolute: true,
      expand: true,
      bg: theme.colors.gold,
    };

    const timelineProps = {
      ref: timeline,
      h: "3px",
      bg: theme.colors.white.fade(0.85),
      onPointerUp: () => onSeek(position),
      onPointerDown: () => update(),
      onPointerMove: () => update(),
    };

    const ballProps = {
      w: "12px",
      h: "12px",
      bg: theme.colors.gold,
      rounded: 1,
      "data-active": ifExists(active),
      "data-scrubbing": ifExists(scrubbing),
    };

    const popperProps = {
      ref: setPopper,
      style: styles.popper,
      active: scrubbing,
      duration: 150,
      ...attributes.popper,
    };

    const timeProps = {
      font: theme.font[6],
      fg: theme.colors.font.subdued,
      weight: theme.weight.bold,
      stretch: "condensed",
    };

    return (
      <>
        <Box css={timelineStyle} {...timelineProps}>
          <Box {...bufferProps} />
          <Box {...progressProps}>
            <Flex absolute center h={1} right="-6px">
              <Box css={ballStyle} {...ballProps} />
            </Flex>
          </Box>
        </Box>
        <Box style={{ right: `${100 * (1 - position)}%` }} absolute>
          <Box ref={setReference} />
          <Activatable css={{ pointerEvents: "none" }} {...popperProps}>
            <TextBox css={{ userSelect: "none" }} {...timeProps}>
              {Time(position * duration)}
            </TextBox>
          </Activatable>
        </Box>
      </>
    );
  }
);
