import styled from "styled-components";

import { Size } from "@lib/types";
import { cssSize } from "@lib/styles/size";
import { Box } from "@lib/components/Box";

export interface TextPlaceholderProps {
  w?: Size;
  font?: string;
  heading?: boolean;
}

export const TextPlaceholder = styled(Box)<TextPlaceholderProps>`
  ${(props) => cssSize("width", props.w ?? 1)}
  height: ${(props) =>
    props.heading
      ? `calc(${props.theme.lineHeight.heading} * ${
          props.font ?? props.theme.font[5]
        })`
      : props.font ?? props.theme.font[5]};
  border-radius: ${(props) => props.theme.border.radius.smallest};
  background-color: ${(props) => props.theme.colors.placeholder.toString()};
`;
