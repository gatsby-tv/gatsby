import { useContext } from "react";

import { FrameContext, FrameContextType } from "./context";

export function useFrame(): FrameContextType {
  const context = useContext(FrameContext);

  if (!context) {
    throw new Error("No Frame context provided for component.");
  }

  return context;
}
