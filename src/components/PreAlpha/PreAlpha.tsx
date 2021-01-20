import React from "react";
import { Portal, Box, TextMeta } from "@gatsby-tv/components";
import { useTheme } from "@gatsby-tv/utilities";

export function PreAlpha(): React.ReactElement {
  const theme = useTheme();

  return (
    <Portal id="pre-alpha">
      <Box
        absolute
        bottom={theme.spacing.baseloose}
        right={theme.spacing.baseloose}
      >
        <Box
          rounded={theme.border.radius.large}
          bg={theme.colors.black}
          padding={[theme.spacing.tight, theme.spacing.basetight]}
        >
          <TextMeta.Link
            href="https://github.com/gatsby-tv/gatsby/issues"
            font="large"
            bold
            external
          >
            Pre-Alpha
          </TextMeta.Link>
        </Box>
      </Box>
    </Portal>
  );
}