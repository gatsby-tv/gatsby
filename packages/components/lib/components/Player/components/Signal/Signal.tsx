import styled from "styled-components";

import { cssSize } from "@lib/styles/size";
import { Box, BoxProps } from "@lib/components/Box";

export type SignalProps = Omit<BoxProps, "h">;

export const Signal = styled(Box)<SignalProps>`
  opacity: 0;
  border-radius: 100%;
  ${(props) => cssSize("width", props.w)}
  ${(props) => cssSize("height", props.w)}

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
  animation-duration: 700ms;
  animation-fill-direction: forwards;
`;
