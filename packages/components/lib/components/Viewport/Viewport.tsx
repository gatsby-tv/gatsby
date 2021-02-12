import React, { forwardRef } from "react";
import { useTheme } from "@gatsby-tv/utilities";

import { Box, BoxProps } from "@lib/components/Box";

export interface ViewportProps {
  children?: React.ReactNode;
  ariaLabel?: string;
  overlay?: React.ReactNode;
  placeholder?: boolean;
  aspectRatio?: number;
}

export const Viewport = forwardRef<HTMLElement, ViewportProps & BoxProps>(
  (props: ViewportProps & BoxProps, ref) => {
    const {
      children,
      ariaLabel,
      overlay,
      placeholder,
      rounded,
      aspectRatio = 0.5625,
      w = 1,
      ...rest
    } = props;

    const theme = useTheme();

    const figureProps = {
      ref: ref as React.RefObject<HTMLElement>,
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
      <Box as="figure" {...figureProps}>
        <Box {...boxProps} />
        {children}
        {OverlayMarkup}
      </Box>
    );
  }
);

Viewport.displayName = "Viewport";
