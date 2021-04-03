import React from "react";
import { Portal, Box, TextMeta } from "@gatsby-tv/components";
import { ifExists, useTheme, useFrame } from "@gatsby-tv/utilities";

export function PreAlpha(): React.ReactElement {
  const { fullscreen } = useFrame();
  const theme = useTheme();

  const style = {
    display: ifExists(fullscreen, "none"),
  };

  const containerProps = {
    style,
    absolute: true,
    bottom: theme.spacing[2],
    right: theme.spacing[2],
  };

  const boxProps = {
    rounded: theme.border.radius.large,
    bg: theme.colors.black,
    padding: [theme.spacing[1], theme.spacing[1.5]],
  };

  const linkProps = {
    href: "https://github.com/gatsby-tv/gatsby/issues",
    font: theme.font[3],
    bold: true,
    external: true,
  };

  return (
    <Portal id="pre-alpha">
      <Box {...containerProps}>
        <Box {...boxProps}>
          <TextMeta.Link {...linkProps}>Pre-Alpha</TextMeta.Link>
        </Box>
      </Box>
    </Portal>
  );
}
