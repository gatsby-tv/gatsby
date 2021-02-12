import { useContext } from "react";
import { ThemeContext, DefaultTheme } from "styled-components";

export function useTheme(): DefaultTheme {
  const context = useContext(ThemeContext);

  if (!context) {
    throw Error("No Theme context provided for component.");
  }

  return context;
}
