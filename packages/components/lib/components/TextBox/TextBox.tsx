import styled from "styled-components";
import { ifExists } from "@gatsby-tv/utilities";

import { cssTextBreakWord, cssTextLineClamp } from "@lib/styles/typography";
import { cssProperty } from "@lib/styles/property";
import { Box, BoxProps } from "@lib/components/Box";

export interface TextBoxProps extends BoxProps {
  spacing?: string;
  font?: string;
  italic?: boolean;
  clamp?: number;
  stretch?: "condensed" | "semi-condensed";
  weight?: number;
  align?: string;
  color?: string;
}

export const TextBox = styled(Box)<TextBoxProps>`
  white-space: pre-line;
  ${(props) => cssProperty("font-size", props.font)}
  ${(props) => cssProperty("font-weight", props.weight?.toString())}
  ${(props) => cssProperty("font-stretch", props.stretch)}
  ${(props) => cssProperty("font-style", ifExists(props.italic, "italic"))}
  ${(props) => ifExists(props.clamp, cssTextLineClamp(props.clamp as number))}
  ${(props) => ifExists(props.clamp, cssTextBreakWord)}
  ${(props) => cssProperty("color", props.color)}
  ${(props) => cssProperty("text-align", props.align)}

  > *:not(:first-child) {
    margin-top: ${(props) => props.spacing ?? props.theme.spacing[1.5]};
  }
`;
