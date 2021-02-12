import { createContext } from "react";

export interface FrameContextType {
  fullscreen: boolean;
  toggleFullscreen: () => void;
  setFullscreen: (value: boolean) => void;
}

export const FrameContext = createContext<FrameContextType | undefined>(
  undefined
);
