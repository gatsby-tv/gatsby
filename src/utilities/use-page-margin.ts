import { useTheme, useFrame } from "@gatsby-tv/utilities";

export function usePageMargin(): string {
  const theme = useTheme();
  const { screen } = useFrame();

  switch (screen) {
    case "mobile":
      return theme.spacing.tight;

    case "tablet":
      return theme.spacing.baseloose;

    default:
      return theme.spacing.loose;
  }
}
