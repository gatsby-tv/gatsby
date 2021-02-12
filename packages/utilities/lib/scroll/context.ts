import React, { createContext, RefObject } from "react";

interface EventHandler {
  (event: React.SyntheticEvent): void;
}

export interface ScrollCallback {
  (callback: EventHandler): void;
}

export type ScrollContextType = {
  scrollPosition: RefObject<number>;
  setScrollPosition: (position: number) => void;
  addScrollListener: ScrollCallback;
  removeScrollListener: ScrollCallback;
};

export const ScrollContext = createContext<ScrollContextType | undefined>(
  undefined
);
