import { css, CSSProp } from "styled-components";

import { Size, Margin } from "@lib/types";
import { parseSize, parseMargin } from "@lib/utilities/size";

export const cssSize = (
  property: string,
  size?: Size,
  defaultValue?: Size
): CSSProp => {
  if (size == null) {
    return defaultValue != null
      ? css`
          ${property}: ${parseSize(defaultValue)};
        `
      : css``;
  }

  return css`
    ${property}: ${parseSize(size)};
  `;
};

export const cssMargin = (
  property: string,
  margin?: Margin,
  defaultValue?: Margin
): CSSProp => {
  if (margin == null) {
    return defaultValue != null
      ? css`
          ${property}: ${parseMargin(defaultValue)};
        `
      : css``;
  }

  return css`
    ${property}: ${parseMargin(margin)};
  `;
};
