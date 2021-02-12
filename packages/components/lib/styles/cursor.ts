import { css, CSSProp } from "styled-components";
import { ifExists } from "@gatsby-tv/utilities";

import { cssProperty } from "@lib/styles/property";

export const cssCursorVisibility = (hidden?: boolean): CSSProp => css`
  &,
  & * {
    ${cssProperty("cursor", ifExists(hidden, "none !important"))}
  }
`;
