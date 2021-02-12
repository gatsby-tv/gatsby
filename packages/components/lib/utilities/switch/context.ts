import { createContext } from "react";

export interface SwitchContextType {
  selection: Record<string, boolean>;
  onSelect: (id: string) => void;
}

export const SwitchContext = createContext<SwitchContextType | undefined>(
  undefined
);
