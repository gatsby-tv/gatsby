import styled from "styled-components";

import { Size } from "@lib/types";
import { cssSize } from "@lib/styles/size";
import { Box, BoxProps } from "@lib/components/Box";

export interface ItemProps extends BoxProps {
  grow?: number;
  shrink?: number;
  basis?: Size;
}

export const Item = styled(Box)<ItemProps>`
  flex-grow: ${(props) => props.grow ?? 0};
  flex-shrink: ${(props) => props.shrink ?? 1};
  ${(props) => cssSize("flex-basis", props.basis, "auto")}
`;
