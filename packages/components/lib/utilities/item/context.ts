import { createContext } from 'react';

export interface ItemContextType {
  itemClass?: string;
}

export const ItemContext = createContext<ItemContextType | undefined>(
  undefined
);
