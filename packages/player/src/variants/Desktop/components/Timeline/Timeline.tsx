import React, { useState, useEffect, forwardRef } from "react";
import { css } from "styled-components";
import { usePopper } from "react-popper";
import { Activatable, Box, TextBox, Flex, EventHandler } from "@gatsby-tv/components";
import { useTheme, Time } from "@gatsby-tv/utilities";

import { TimelineProps } from "@src/types";

export const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  (props: TimelineProps, ref) => {
    const { position, scrubbing, time, progress, duration, onSeek } = props;

    const theme = useTheme();
    const [active, setActive] = useState(false);
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
              offset: [0, 15],
            },
          },
          {
            name: "preventOverflow",
            options: {
              tether: false,
              padding: 8,
            },
          },
        ],
      }
    );

    const timelineStyle = css`
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

    const ballStyle = css`
      transform: scale(0);
      transition: transform 150ms ease;
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
      ref,
      h: "4px",
      bg: theme.colors.white.fade(0.85),
      onClick: () => onSeek(position),
      onPointerMove: () => {
        update();
        setActive(true);
      },
      onPointerLeave: () => setActive(false),
    };

    const ballProps = {
      w: "14px",
      h: "14px",
      bg: theme.colors.gold,
      rounded: 1,
      "data-progress-ball": true,
    };

    const popperProps = {
      ref: setPopper,
      style: styles.popper,
      active,
      duration: 150,
      ...attributes.popper,
    };

    const timeProps = {
      font: theme.font[4],
      stretch: "condensed",
      weight: theme.weight.bold,
    };

    return (
      <>
        <Box css={timelineStyle} {...timelineProps}>
          <Box {...bufferProps} />
          <Box {...progressProps}>
            <Flex absolute center h={1} right="-7px">
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
