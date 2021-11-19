import { createContext, DispatchWithoutAction } from 'react';

export type StagingContextType = {
  current: number;
  previous: number;
  sync: DispatchWithoutAction;
};

export const StagingContext = createContext<StagingContextType | undefined>(
  undefined
);
