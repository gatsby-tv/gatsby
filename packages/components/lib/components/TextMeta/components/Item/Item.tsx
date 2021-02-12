import styled from "styled-components";
import { ifExists, ifNotExists } from "@gatsby-tv/utilities";

import { cssProperty } from "@lib/styles/property";
import {
  cssTextBreakWord,
  cssTextLineClamp,
  cssTextTruncate,
  cssTextSubdued,
} from "@lib/styles/typography";

export interface ItemProps {
  font?: string;
  clamp?: number;
  bold?: boolean;
  subdued?: boolean;
  heading?: boolean;
}

export const Item = styled.span<ItemProps>`
  ${cssTextBreakWord}
  ${cssTextTruncate}
  ${(props) => cssProperty("font-size", props.font)}
  ${(props) => cssProperty("font-weight", ifExists(props.bold, 600))}
  ${(props) => cssProperty("white-space", ifNotExists(props.clamp, "nowrap"))}
  ${(props) =>
    cssProperty(
      "line-height",
      ifExists(props.heading, props.theme.lineHeight.heading)
    )}
  ${(props) => ifExists(props.clamp, cssTextLineClamp(props.clamp as number))}
  ${(props) => ifExists(props.subdued, cssTextSubdued)}
`;
