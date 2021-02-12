import { createContext } from "react";

interface EventHandler {
  (event: any): void;
}

interface ModalCallback {
  (callback: EventHandler): void;
}

export type ModalContextType = [ModalCallback, ModalCallback];

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);
