import { createContext } from "react";

export interface ConnectedContextType {
  column?: boolean;
}

export const ConnectedContext = createContext<ConnectedContextType | undefined>(
  undefined
);
