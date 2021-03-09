import React from "react";
import { css } from "styled-components";
import { Flex, Box, Icon } from "@gatsby-tv/components";
import { Play, Pause, SkipForward, SkipBackward } from "@gatsby-tv/icons";
import { Size } from "@gatsby-tv/components/dist/types";
import { useTheme } from "@gatsby-tv/utilities";

export interface SignalProps {
  signal?: string;
  size: Size;
  padding?: Size;
  zIndex?: number;
}

export function Signal(props: SignalProps): React.ReactElement | null {
  const { signal, size, padding, zIndex } = props;
  const theme = useTheme();

  let icon;
  switch (signal?.split(".")[0]) {
    case "play":
      icon = Play;
      break;

    case "pause":
      icon = Pause;
      break;

    case "forward":
      icon = SkipForward;
      break;

    case "backward":
      icon = SkipBackward;
      break;
  }

  const style = css`
    opacity: 0;
    border-radius: 100%;

    svg#gz-pause {
      transform: scale(0.9);
    }

    svg#gz-play {
      transform: scale(0.9) translateX(2px);
    }

    @keyframes enter {
      0% {
        opacity: 0.1;
        transform: scale(0.6);
      }

      30% {
        opacity: 0.5;
      }

      100% {
        opacity: 0;
        transform: scale(1);
      }
    }

    animation-name: enter;
    animation-duration: ${theme.duration.slow}ms;
    animation-fill-direction: forwards;
  `;

  return signal ? (
    <Flex key={signal} absolute expand center>
      <Box
        css={style}
        padding={padding}
        bg={theme.colors.black}
        fg={theme.colors.white}
        zIndex={zIndex}
      >
        <Icon src={icon} w={size} />
      </Box>
    </Flex>
  ) : null;
}
