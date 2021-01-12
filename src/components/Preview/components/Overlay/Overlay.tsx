import React from "react";
import { Box, TextMeta } from "@gatsby-tv/components";
import { Time, useTheme } from "@gatsby-tv/utilities";

export interface OverlayProps {
  duration: number;
}

export function Overlay(props: OverlayProps): React.ReactElement {
  const theme = useTheme();

  return (
    <Box
      absolute
      bottom={theme.spacing.extraTight}
      right={theme.spacing.extraTight}
      bg={theme.colors.black.fade(0.3)}
      padding={[theme.spacing.none, theme.spacing.extraTight]}
    >
      <TextMeta font="small" bold>
        {Time(props.duration)}
      </TextMeta>
    </Box>
  );
}
