import { createContext } from "react";

export interface UniqueIdGenerator {
  (): string;
}

export interface UniqueIdContextType {
  (prefix: string): UniqueIdGenerator;
}

export const UniqueIdContext = createContext<UniqueIdContextType | undefined>(
  undefined
);
