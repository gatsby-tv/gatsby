import { createContext } from 'react';

export type SupportsContextType = {
  hasFlexGap: boolean;
  hasAspectRatio: boolean;
}

export const SupportsContext = createContext<SupportsContextType | undefined>(
  undefined
);
