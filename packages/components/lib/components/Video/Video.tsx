import React, { forwardRef } from "react";

import { Box, BoxProps } from "@lib/components/Box";

export type VideoProps = React.VideoHTMLAttributes<HTMLElement> & BoxProps;

export const Video = forwardRef<HTMLVideoElement, VideoProps>((props, ref) => {
  const videoProps = {
    ref: ref as React.RefObject<HTMLVideoElement>,
    w: 1,
    h: 1,
    ...props,
  };

  return <Box as="video" {...videoProps} />;
});

Video.displayName = "Video";
