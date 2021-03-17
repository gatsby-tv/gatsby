import styled from "styled-components";
import { ifExists } from "@gatsby-tv/utilities";

import { DisplaySize } from "@lib/types";
import { cssProperty } from "@lib/styles/property";
import { cssTextDisplay } from "@lib/styles/typography";

import { Link, LinkProps } from "./components/Link";

export type { LinkProps as TextDisplayLinkProps };

export interface TextDisplayProps {
  size?: DisplaySize;
  thin?: boolean;
}

const TextDisplayBase = styled.h1<TextDisplayProps>`
  ${(props) => cssTextDisplay(props.size ?? "small")}
  ${(props) => cssProperty("font-weight", ifExists(props.thin, 500))}
`;

export const TextDisplay = Object.assign(TextDisplayBase, {
  Link,
  displayName: "TextDisplay",
});
