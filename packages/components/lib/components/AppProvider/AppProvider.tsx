import {
  useState,
  useEffect,
  useCallback,
  ReactNode,
  ReactElement,
} from 'react';
import {
  UniqueIdContext,
  useUniqueIdGenerator,
  ModalContext,
  useModalContext,
  SnackBarContext,
  useSnackBarContext,
} from '@gatsby-tv/utilities';

import { SnackBar } from '@lib/components/SnackBar';
import { Injection } from '@lib/components/Injection';
import {
  InjectionContext,
  useInjectionContext,
} from '@lib/utilities/injection';
import { useSupports } from '@lib/utilities/supports';

import './AppProvider.scss';

export interface AppProviderProps {
  children?: ReactNode;
}

export function AppProvider(props: AppProviderProps): ReactElement {
  const { children } = props;
  const uniqueIdGenerator = useUniqueIdGenerator();
  const modalContext = useModalContext();
  const snackBarContext = useSnackBarContext();
  const injectionContext = useInjectionContext();
  useSupports();

  return (
    <SnackBarContext.Provider value={snackBarContext}>
      <ModalContext.Provider value={modalContext}>
        <UniqueIdContext.Provider value={uniqueIdGenerator}>
          <InjectionContext.Provider value={injectionContext}>
            <SnackBar />
            <Injection.Target id="$background" />
            {children}
            <Injection.Target id="$foreground" />
          </InjectionContext.Provider>
        </UniqueIdContext.Provider>
      </ModalContext.Provider>
    </SnackBarContext.Provider>
  );
}
