import React, { useState, useEffect, useCallback } from "react";
import {
  UniqueIdContext,
  useUniqueIdGenerator,
  ModalContext,
  useModalContext,
} from "@gatsby-tv/utilities";

import { EventHandler } from "@lib/types";
import { AppContext } from "@lib/utilities/app";
import { InjectionContext, useInjectionContext } from "@lib/utilities/injection";
import { useSupports } from "@lib/utilities/supports";

import "./AppProvider.scss";

export interface AppProviderProps {
  children?: React.ReactNode;
}

export function AppProvider(props: AppProviderProps): React.ReactElement {
  const { children } = props;
  const uniqueIdGenerator = useUniqueIdGenerator();
  const [loadingSemaphore, setLoadingSemaphore] = useState(0);
  const modalContext = useModalContext();
  const injectionContext = useInjectionContext();

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
          <InjectionContext.Provider value={injectionContext}>
            {children}
          </InjectionContext.Provider>
        </UniqueIdContext.Provider>
      </ModalContext.Provider>
    </AppContext.Provider>
  );
}
