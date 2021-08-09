import { createContext } from 'react';

export type StagingContextType = {
  stage: number;
};

export const StagingContext = createContext<StagingContextType | undefined>(
  undefined
);
