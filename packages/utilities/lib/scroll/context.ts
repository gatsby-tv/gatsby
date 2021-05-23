import React, { createContext, RefObject } from 'react';

import { EventHandler } from '@lib/types';

export type ScrollContextType = {
  scroll: RefObject<number>;
  setScroll: (position: number) => void;
  addScrollListener: (handler: EventHandler) => void;
  removeScrollListener: (handler: EventHandler) => void;
};

export const ScrollContext = createContext<ScrollContextType | undefined>(
  undefined
);
