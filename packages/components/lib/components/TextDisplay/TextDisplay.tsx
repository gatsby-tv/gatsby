import styled from "styled-components";
import { ifExists } from "@gatsby-tv/utilities";

import { DisplaySize } from "@lib/types";
import { cssProperty } from "@lib/styles/property";
import { cssTextDisplay } from "@lib/styles/typography";

export interface TextDisplayProps {
  size?: DisplaySize;
  thin?: boolean;
}

export const TextDisplay = styled.h1<TextDisplayProps>`
  ${(props) => cssTextDisplay(props.size ?? "small")}
  ${(props) => cssProperty("font-weight", ifExists(props.thin, 500))}
`;
