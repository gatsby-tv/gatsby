import styled from "styled-components";

import { Box, BoxProps } from "@lib/components/Box";

export type CardProps = BoxProps;

export const Card = styled(Box)<CardProps>`
  border-radius: ${(props) => props.theme.border.radius.base};
  overflow: hidden;
`;
