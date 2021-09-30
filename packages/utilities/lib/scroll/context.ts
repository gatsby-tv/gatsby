import { createContext, RefObject, Dispatch, SetStateAction } from 'react';

import { EventHandler } from '@lib/types';

export type ScrollContextType = {
  active: boolean;
  scroll: RefObject<number>;
  setScroll: Dispatch<SetStateAction<number>>;
  addScrollListener: (handler: EventHandler) => void;
  removeScrollListener: (handler: EventHandler) => void;
};

export const ScrollContext = createContext<ScrollContextType | undefined>(
  undefined
);
