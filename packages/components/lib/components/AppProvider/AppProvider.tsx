import React, { useState, useEffect, useCallback } from 'react';
import {
  UniqueIdContext,
  useUniqueIdGenerator,
  ModalContext,
  useModalContext,
} from '@gatsby-tv/utilities';

import { EventHandler } from '@lib/types';
import { Injection } from '@lib/components/Injection';
import {
  InjectionContext,
  useInjectionContext,
} from '@lib/utilities/injection';
import { useSupports } from '@lib/utilities/supports';

import './AppProvider.scss';

export interface AppProviderProps {
  children?: React.ReactNode;
}

export function AppProvider(props: AppProviderProps): React.ReactElement {
  const { children } = props;
  const uniqueIdGenerator = useUniqueIdGenerator();
  const modalContext = useModalContext();
  const injectionContext = useInjectionContext();
  useSupports();

  return (
    <ModalContext.Provider value={modalContext}>
      <UniqueIdContext.Provider value={uniqueIdGenerator}>
        <InjectionContext.Provider value={injectionContext}>
          <Injection.Target id="$background" />
          {children}
          <Injection.Target id="$foreground" />
        </InjectionContext.Provider>
      </UniqueIdContext.Provider>
    </ModalContext.Provider>
  );
}
