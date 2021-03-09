import React, { useState, useEffect, useCallback } from "react";
import { IPFSContent } from "@gatsby-tv/types";
import { ifExists, useIPFSContent } from "@gatsby-tv/utilities";

import { Size, Margin } from "@lib/types";
import { Box } from "@lib/components/Box";
import { Viewport } from "@lib/components/Viewport";

export type ImageProps = {
  src?: IPFSContent | string;
  w?: Size;
  crop?: Margin;
  rounded?: Size;
  aspectRatio?: number;
  overlay?: React.ReactNode;
  ariaLabel?: string;
} & Omit<React.ImgHTMLAttributes<HTMLElement>, "src">;

type ImageURLProps = ImageProps & { src?: string };

type ImageIPFSProps = ImageProps & { src: IPFSContent };

function isImageURLProps(props: ImageProps): props is ImageURLProps {
  return typeof (props as ImageURLProps).src !== "object";
}

function ImageURL(props: ImageURLProps): React.ReactElement {
  const {
    aspectRatio = 1,
    w,
    crop,
    overlay,
    rounded,
    ariaLabel,
    ...imgProps
  } = props;
  const [loading, setLoading] = useState(true);

  const handleLoad = useCallback(() => setLoading(false), []);

  useEffect(() => setLoading(true), [imgProps.src]);

  const viewportProps = {
    placeholder: true,
    crop,
    w,
    overlay,
    aspectRatio,
    rounded,
    ariaLabel,
  };

  const boxProps = {
    style: loading
      ? { paddingTop: `${100 * aspectRatio}%`, height: 0 }
      : undefined,
    alt: "",
    expand: true,
    rounded,
    onLoad: handleLoad,
    ...imgProps,
  };

  return (
    <Viewport {...viewportProps}>
      <Box as="img" {...boxProps} />
    </Viewport>
  );
}

function ImageIPFS(props: ImageIPFSProps): React.ReactElement {
  const { src, ...rest } = props;
  const { url } = useIPFSContent(src);

  return <ImageURL src={url} {...rest} />;
}

export function Image(props: ImageProps): React.ReactElement {
  if (isImageURLProps(props)) {
    return <ImageURL {...props} />;
  } else {
    return <ImageIPFS {...(props as ImageIPFSProps)} />;
  }
}
