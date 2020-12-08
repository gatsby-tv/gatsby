import { createContext } from "react";

export interface IPFSContextType {
  ipfs: any;
  isReady: boolean;
  error: Error;
}

export const IPFSContext = createContext<IPFSContextType | undefined>(
  undefined
);
