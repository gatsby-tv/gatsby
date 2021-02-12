import React, { useState, useCallback } from "react";
import { IPFSContent } from "@gatsby-tv/types";
import { useTheme, useIPFSContent } from "@gatsby-tv/utilities";

import { Box } from "@lib/components/Box";
import { Viewport } from "@lib/components/Viewport";

export type AvatarProps = {
  src?: IPFSContent | string;
  ariaLabel?: string;
  size?: string;
  overlay?: React.ReactNode;
} & Omit<React.ImgHTMLAttributes<HTMLElement>, "src">;

type AvatarURLProps = AvatarProps & { src?: string };

type AvatarIPFSProps = AvatarProps & { src: IPFSContent };

function isAvatarURLProps(props: AvatarProps): props is AvatarURLProps {
  return typeof (props as AvatarURLProps).src !== "object";
}

function AvatarURL(props: AvatarURLProps): React.ReactElement {
  const theme = useTheme();
  const { size = theme.avatar.base, overlay, ariaLabel, ...imgProps } = props;
  const [loading, setLoading] = useState(true);

  const handleLoad = useCallback(() => setLoading(false), []);

  const viewportProps = {
    placeholder: true,
    rounded: 1,
    w: size,
    h: size,
    aspectRatio: 1,
    overlay,
    ariaLabel,
  };

  const boxProps = {
    style: loading ? { paddingTop: "100%", height: 0 } : undefined,
    alt: "",
    expand: true,
    rounded: theme.border.radius.full,
    onLoad: handleLoad,
    ...imgProps,
  };

  return (
    <Viewport {...viewportProps}>
      <Box as="img" {...boxProps} />
    </Viewport>
  );
}

function AvatarIPFS(props: AvatarIPFSProps): React.ReactElement {
  const { src, ...rest } = props;
  const { url } = useIPFSContent(src);

  return <AvatarURL src={url} {...rest} />;
}

export function Avatar(props: AvatarProps): React.ReactElement {
  if (isAvatarURLProps(props)) {
    return <AvatarURL {...props} />;
  } else {
    return <AvatarIPFS {...(props as AvatarIPFSProps)} />;
  }
}
