import { css, CSSProp } from "styled-components";

import { cssProperty } from "@lib/styles/property";
import { DisplaySize } from "@lib/types";

export const cssTextSubdued = css`
  color: ${(props) => props.theme.colors.font.subdued.toString()};
`;

export const cssTextCondensed = css`
  font-stretch: condensed;
`;

export const cssTextSemiCondensed = css`
  font-stretch: semi-condensed;
`;

export const cssTextBreakWord = css`
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
`;

export const cssTextTruncate = css`
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const cssTextLineClamp = (lines: number): CSSProp => css`
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${lines};
`;

export const cssTextBody = css`
  white-space: pre-line;
  font-weight: 400;
`;

export const cssTextDisplay = (size: DisplaySize): CSSProp => css`
  font-size: ${(props) =>
    size === "small" ? props.theme.font[2] : props.theme.font[1]};
  line-height: ${(props) => props.theme.lineHeight.heading};
  font-weight: 700;
`;

export const cssTextHeading = css`
  font-size: ${(props) => props.theme.font[3]};
  line-height: ${(props) => props.theme.lineHeight.heading};
  font-weight: 600;
`;

export const cssTextSubheading = css`
  font-size: ${(props) => props.theme.font[5]};
  line-height: ${(props) => props.theme.lineHeight.heading};
  font-weight: 600;
  text-transform: uppercase;
`;

export const cssTextError = css`
  color: ${(props) => props.theme.colors.error.toString()};
  font-weight: 500;
`;

export const cssTextLabel = css`
  ${cssTextCondensed}
  font-weight: 500;
`;

export const cssTextCaption = css`
  ${cssTextSemiCondensed}
  font-size: ${(props) => props.theme.font[6]};
  font-weight: 400;
`;

export const cssTextInput = css`
  white-space: pre-line;
  font-weight: 400;
  appearance: none;
`;

export const cssTextUppercase = css`
  font-weight: 600;
  appearance: none;
  text-transform: uppercase;
`;

export const cssTextTimeline = css`
  ${cssTextCondensed}
  font-size: ${(props) => props.theme.font[4]};
  font-weight: 600;
  user-select: none;
`;

export const cssTextTab = (size?: string): CSSProp => css`
  ${cssTextCondensed}
  ${cssProperty("font-size", size)}
  font-weight: 600;
  text-align: center;
  user-select: none;
`;

export const cssTextButton = css`
  ${cssTextUppercase}
  text-align: center;
  vertical-align: middle;
`;
