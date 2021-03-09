import styled from "styled-components";
import { ifExists } from "@gatsby-tv/utilities";

import { Time } from "@lib/types";
import { cssTransition } from "@lib/styles/transition";
import { cssProperty } from "@lib/styles/property";
import { Box, BoxProps } from "@lib/components/Box";

export interface ActivatableProps extends BoxProps {
  active?: boolean;
  duration?: Time;
  delay?: Time;
}

export const Activatable = styled(Box)<ActivatableProps>`
  opacity: ${(props) => (props.active ? 1 : 0)};
  ${(props) => cssTransition(
    "opacity",
    props.duration ?? props.theme.duration.base,
    "ease",
    ifExists(props.active && props.delay, props.delay)
  )}
`;
