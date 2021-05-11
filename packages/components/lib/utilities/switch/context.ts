import { createContext } from "react";

export interface SwitchContextType {
  selection: string;
  onSelect: (id: string) => void;
}

export const SwitchContext = createContext<SwitchContextType | undefined>(
  undefined
);
