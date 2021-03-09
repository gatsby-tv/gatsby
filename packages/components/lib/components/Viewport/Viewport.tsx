import React, { forwardRef } from "react";
import { css } from "styled-components";
import { Negative, useTheme } from "@gatsby-tv/utilities";

import { Box, BoxProps } from "@lib/components/Box";
import { cssMargin } from "@lib/styles/size";
import { Margin } from "@lib/types";

export interface ViewportProps {
  children?: React.ReactNode;
  crop?: Margin;
  ariaLabel?: string;
  overlay?: React.ReactNode;
  placeholder?: boolean;
  aspectRatio?: number;
}

export const Viewport = forwardRef<HTMLElement, ViewportProps & BoxProps>(
  (props: ViewportProps & BoxProps, ref) => {
    const {
      children,
      crop,
      ariaLabel,
      overlay,
      placeholder,
      rounded,
      aspectRatio = 0.5625,
      w = 1,
      ...rest
    } = props;

    const theme = useTheme();

    const figureStyle = crop
      ? css`
          overflow: hidden;

          & > *:nth-child(2) {
            ${cssMargin(
              "margin",
              [crop as Margin].flat().map((margin) => Negative(margin))
            )}
          }
        `
      : css``;

    const figureProps = {
      ref,
      w,
      rounded,
      "aria-label": ariaLabel,
      ...rest,
    };

    const boxProps = {
      style: { paddingTop: `${100 * aspectRatio}%` },
      absolute: true,
      bg: placeholder ? theme.colors.placeholder : theme.colors.trueblack,
      w: 1,
      rounded,
    };

    const OverlayMarkup = overlay ? (
      <Box absolute expand>
        {overlay}
      </Box>
    ) : null;

    return (
      <Box as="figure" css={figureStyle} {...figureProps}>
        <Box {...boxProps} />
        {children}
        {OverlayMarkup}
      </Box>
    );
  }
);

Viewport.displayName = "Viewport";
