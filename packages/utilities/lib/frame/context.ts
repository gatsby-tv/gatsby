import { createContext, Dispatch, SetStateAction } from 'react';

export interface FrameContextType {
  screen: { width: number; height: number };
  offset: { x: number; y: number };
  setTopbar: Dispatch<SetStateAction<boolean>>;
  setSidebar: Dispatch<SetStateAction<boolean>>;
}

export const FrameContext = createContext<FrameContextType | undefined>(
  undefined
);
