import { css } from "styled-components";
import { Negative } from "@gatsby-tv/utilities";

export const cssCollation = (gap?: string | number) => css`
  & > * {
    margin-right: ${(props) => Negative(gap ?? props.theme.spacing.base)};
  }

  & > *:first-child {
    margin-right: 0;
  }
`;
