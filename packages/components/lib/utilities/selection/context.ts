import { createContext } from "react";

export interface SelectionContextType {
  column: boolean;
  selection: Record<string, boolean>;
  onSelect: (id: string) => void;
}

export const SelectionContext = createContext<SelectionContextType | undefined>(
  undefined
);
