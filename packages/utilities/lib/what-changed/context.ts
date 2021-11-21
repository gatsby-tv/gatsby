import { createContext, MutableRefObject } from 'react';

export type WhatChangedContextType = {
  keys: MutableRefObject<Record<string, number>>;
};

export const WhatChangedContext = createContext<
  WhatChangedContextType | undefined
>(undefined);
