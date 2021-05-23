import { createContext } from 'react';

export interface SelectionContextType {
  selection?: string | string[];
  setSelection: (option: string) => void;
  clearSelection?: (option: string) => void;
}

export const SelectionContext = createContext<SelectionContextType | undefined>(
  undefined
);
