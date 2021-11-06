import { createContext } from 'react';

export type StylesContextType = Record<string, string>;

export const StylesContext = createContext<StylesContextType | undefined>(
  undefined
);
