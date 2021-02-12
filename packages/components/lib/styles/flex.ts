import { css, CSSProp } from "styled-components";
import { ifExists } from "@gatsby-tv/utilities";

import { Size, FlexDistribute } from "@lib/types";
import { parseSize } from "@lib/utilities/size";
import { supportsFlexGap } from "@lib/utilities/supports";
import { cssSize } from "@lib/styles/size";
import { cssProperty } from "@lib/styles/property";

const cssSafariFlexGap = (gap?: Size, column?: boolean) =>
  column
    ? css`
        & > *:not(:first-child) {
          ${cssSize("margin-top", gap)}
        }
      `
    : css`
        & > *:not(:first-child) {
          ${cssSize("margin-left", gap)}
        }
      `;

export const cssFlexGap = (gap?: Size, column?: boolean): CSSProp => css`
  ${!supportsFlexGap() ? cssSafariFlexGap(gap, column) : cssSize("gap", gap)}
`;

export const cssFlexDistribute = (
  className: string,
  distribute?: FlexDistribute
): CSSProp => {
  switch (distribute) {
    case "fill":
      return css`
        & > ${className} {
          flex: 1 1 auto;
        }
      `;

    case "fill-evenly":
      return css`
        & > ${className} {
          flex: 1 1 auto;

          @supports (min-width: fit-content) {
            min-width: fit-content;
            flex: 1 0 0%;
          }
        }
      `;

    default:
      return css``;
  }
};

export const cssFlexGroups = (
  className: string,
  groups?: number,
  gap?: Size
): CSSProp => css`
  & > ${className} {
    ${cssProperty("flex-grow", ifExists(groups, 1))}
    ${cssProperty(
      "flex-basis",
      ifExists(
        groups,
        gap
          ? `calc(${Math.floor(100 / (groups as number))}% - ${parseSize(
              gap
            )} * (1 - 1 / ${groups as number}))`
          : `${Math.floor(100 / (groups as number))}%`
      )
    )}
  }
`;
