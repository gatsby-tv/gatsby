import { DependencyList, ReactNode, ReactElement } from 'react';
import {
  UniqueIdContext,
  useUniqueIdContext,
  FullscreenContext,
  useFullscreenContext,
  SnackBarContext,
  useSnackBarContext,
  BreadcrumbsContext,
  useBreadcrumbsContext,
  WhatChangedContext,
  useWhatChangedContext,
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
  const uniqueIdContext = useUniqueIdContext();
  const fullscreenContext = useFullscreenContext();
  const snackBarContext = useSnackBarContext();
  const breadcrumbsContext = useBreadcrumbsContext();
  const injectionContext = useInjectionContext();
  const modalContext = useModalContext(deps);
  const whatChangedContext = useWhatChangedContext();

  return (
    <WhatChangedContext.Provider value={whatChangedContext}>
      <SupportsContext.Provider value={supportsContext}>
        <BreadcrumbsContext.Provider value={breadcrumbsContext}>
          <SnackBarContext.Provider value={snackBarContext}>
            <FullscreenContext.Provider value={fullscreenContext}>
              <ModalContext.Provider value={modalContext}>
                <UniqueIdContext.Provider value={uniqueIdContext}>
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
        </BreadcrumbsContext.Provider>
      </SupportsContext.Provider>
    </WhatChangedContext.Provider>
  );
}
