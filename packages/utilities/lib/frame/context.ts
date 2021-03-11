import { createContext } from "react";

export interface FrameContextType {
  screen: { width: number; height: number; };
  offset: { x: number; y: number; };
  fullscreen: boolean;
  toggleFullscreen: () => void;
  setFullscreen: (value: boolean) => void;
}

export const FrameContext = createContext<FrameContextType | undefined>(
  undefined
);
