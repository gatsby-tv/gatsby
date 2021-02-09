import { css, CSSProp } from "styled-components";
import { Negative } from "@gatsby-tv/utilities";

export const cssCollation = (gap?: string | number): CSSProp => css`
  & > * {
    margin-right: ${(props) => Negative(gap ?? props.theme.spacing[1.5])};
  }

  & > *:first-child {
    margin-right: 0;
  }
`;
