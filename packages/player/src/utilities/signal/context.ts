import { createContext, Dispatch, SetStateAction } from 'react';

export type SignalContextType = [
  string | undefined,
  Dispatch<SetStateAction<string | undefined>>
];

export const SignalContext = createContext<SignalContextType | undefined>(
  undefined
);
