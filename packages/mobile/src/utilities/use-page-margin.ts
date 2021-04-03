import { useTheme, useFrame } from "@gatsby-tv/utilities";

export function usePageMargin(): [string, string] | undefined {
  const theme = useTheme();
  const { screen } = useFrame();
  return screen.width <= 650
    ? [theme.spacing[0], theme.spacing[1.5]]
    : undefined;
}
