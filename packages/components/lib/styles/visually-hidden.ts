import { css } from "styled-components";

export const cssVisuallyHidden = css`
  position: absolute !important;
  top: 0 !important;
  clip: rect(1px, 1px, 1px, 1px) !important;
  overflow: hidden !important;
  height: 1px !important;
  width: 1px !important;
  padding: 0 !important;
  border: none !important;
`;
