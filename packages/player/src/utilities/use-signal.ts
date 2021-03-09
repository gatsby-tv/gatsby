import { useEffect, Dispatch, SetStateAction } from "react";
import { useVolatileKey, useTheme } from "@gatsby-tv/utilities";

export function useSignal(): [string | undefined, Dispatch<SetStateAction<string | undefined>>] {
  const theme = useTheme();
  const [signal, setSignal] = useVolatileKey();

  useEffect(() => {
    const id = setTimeout(setSignal, theme.duration.slow);
    return () => clearTimeout(id);
  }, [signal]);

  return [signal, setSignal];
}
