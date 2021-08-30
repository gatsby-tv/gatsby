import { DependencyList, ReactNode, ReactElement } from 'react';
import {
  UniqueIdContext,
  useUniqueIdGenerator,
  FullscreenContext,
  useFullscreenContext,
  SnackBarContext,
  useSnackBarContext,
} from '@gatsby-tv/utilities';

import { SnackBar } from '@lib/components/SnackBar';
import { Injection } from '@lib/components/Injection';
import {
  InjectionContext,
  useInjectionContext,
} from '@lib/utilities/injection';
import { ModalContext, useModalContext } from '@lib/utilities/modal';
import { SupportsContext, useSupportsContext } from '@lib/utilities/supports';

import './AppProvider.scss';

export interface AppProviderProps {
  children?: ReactNode;
  deps?: DependencyList;
}

export function AppProvider(props: AppProviderProps): ReactElement {
  const { children, deps = [] } = props;
  const supportsContext = useSupportsContext();
  const uniqueIdGenerator = useUniqueIdGenerator();
  const fullscreenContext = useFullscreenContext();
  const snackBarContext = useSnackBarContext();
  const injectionContext = useInjectionContext();
  const modalContext = useModalContext(deps);

  return (
    <SupportsContext.Provider value={supportsContext}>
      <SnackBarContext.Provider value={snackBarContext}>
        <FullscreenContext.Provider value={fullscreenContext}>
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
        </FullscreenContext.Provider>
      </SnackBarContext.Provider>
    </SupportsContext.Provider>
  );
}
