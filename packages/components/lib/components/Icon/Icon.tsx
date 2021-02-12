import React from "react";
import { css } from "styled-components";

import { IconSource } from "@lib/types";
import { Box, BoxProps } from "@lib/components/Box";

export type IconProps = BoxProps & {
  src: IconSource;
  ariaLabel?: string;
};

export function Icon(props: IconProps): React.ReactElement {
  const { src: SvgComponent, ariaLabel, ...boxProps } = props;

  const style = css`
    & > svg {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
    }
  `;

  return (
    <Box as="span" css={style} aria-label={ariaLabel} {...boxProps}>
      <SvgComponent aria-hidden="true" focusable="false" />
    </Box>
  );
}
