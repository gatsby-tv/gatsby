import styled from "styled-components";

import { Box, BoxProps } from "@lib/components/Box";
import { cssProperty } from "@lib/styles/property";

export interface ItemProps extends BoxProps {
  columns?: (number | string) | (number | string)[];
  rows?: (number | string) | (number | string)[];
}

export const Item = styled(Box)<ItemProps>`
  ${(props) =>
    cssProperty("grid-column-start", [props.columns].flat()[0]?.toString())}
  ${(props) =>
    cssProperty("grid-column-end", [props.columns].flat()[1]?.toString())}
  ${(props) =>
    cssProperty("grid-row-start", [props.rows].flat()[0]?.toString())}
  ${(props) => cssProperty("grid-row-end", [props.rows].flat()[1]?.toString())}
`;
