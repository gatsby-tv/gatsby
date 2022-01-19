/* eslint-disable @typescript-eslint/no-explicit-any */

import { createContext } from 'react';

export type IPFSContextType = any;

export const IPFSContext = createContext<IPFSContextType | undefined>(
  undefined
);
