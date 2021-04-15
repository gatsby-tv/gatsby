import { createContext } from "react";

export interface FrameContextType {
  screen: { width: number; height: number; };
  offset: { x: number; y: number; };
  fullscreen: boolean;
  setFullscreen: (value: boolean | ((value: boolean) => boolean)) => void;
  setTopbar: (value: boolean | ((value: boolean) => boolean)) => void;
  setSidebar: (value: boolean | ((value: boolean) => boolean)) => void;
}

export const FrameContext = createContext<FrameContextType | undefined>(
  undefined
);
