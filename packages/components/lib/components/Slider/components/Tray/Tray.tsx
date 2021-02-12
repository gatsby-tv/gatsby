import styled from "styled-components";

import { Flex } from "@lib/components/Flex";
import { cssFlexGroups, cssFlexGap } from "@lib/styles/flex";
import { Size } from "@lib/types";

export interface TrayProps {
  groups?: number;
  gap?: Size;
}

export const Tray = styled.div<TrayProps>`
  display: flex;
  transition: transform ${(props) => props.theme.duration.fast} ease;
  ${(props) => cssFlexGap(props.gap, false)}
  ${(props) => cssFlexGroups(`${Flex.Item}`, props.groups, props.gap)}
`;
