import React, { useState, useEffect, useCallback } from "react";
import { ThemeProvider, DefaultTheme } from "styled-components";
import {
  UniqueIdContext,
  useUniqueIdGenerator,
  ModalContext,
  useModalContext,
} from "@gatsby-tv/utilities";

import { EventHandler } from "@lib/types";
import { AppContext } from "@lib/utilities/app";
import { useSupports } from "@lib/utilities/supports";
import { DarkTheme, LightTheme } from "@lib/styles/theme";

import { Global } from "./components";

export interface AppProviderProps {
  children?: React.ReactNode;
  theme?: "dark" | "light";
}

export function AppProvider(props: AppProviderProps): React.ReactElement {
  const theme: DefaultTheme = props.theme === "light" ? LightTheme : DarkTheme;
  const uniqueIdGenerator = useUniqueIdGenerator();
  const [loadingSemaphore, setLoadingSemaphore] = useState(0);
  const modalContext = useModalContext();

  useSupports();

  const startLoading = useCallback(
    () => setLoadingSemaphore((value) => value + 1),
    []
  );

  const stopLoading = useCallback(
    () => setLoadingSemaphore((value) => Math.max(0, value - 1)),
    []
  );

  const context = {
    startLoading,
    stopLoading,
    isLoading: loadingSemaphore !== 0,
  };

  return (
    <AppContext.Provider value={context}>
      <ModalContext.Provider value={modalContext}>
        <UniqueIdContext.Provider value={uniqueIdGenerator}>
          <ThemeProvider theme={theme}>
            <Global />
            {props.children}
          </ThemeProvider>
        </UniqueIdContext.Provider>
      </ModalContext.Provider>
    </AppContext.Provider>
  );
}
