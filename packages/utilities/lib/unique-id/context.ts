import { createContext } from 'react';

export type UniqueIdGeneratorType = () => string;

export interface UniqueIdContextType {
  (prefix: string): UniqueIdGeneratorType;
}

export const UniqueIdContext = createContext<UniqueIdContextType | undefined>(
  undefined
);
