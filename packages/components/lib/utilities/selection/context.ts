import { createContext } from "react";

export interface SelectionContextType {
  selection: string;
  onSelect: (id: string) => void;
}

export const SelectionContext = createContext<SelectionContextType | undefined>(
  undefined
);
