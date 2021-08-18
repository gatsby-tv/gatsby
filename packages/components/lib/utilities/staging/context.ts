import { createContext } from 'react';

export type StagingContextType = {
  current: number;
  previous: number;
  onTransitionEnd: () => void;
};

export const StagingContext = createContext<StagingContextType | undefined>(
  undefined
);
