import { createContext } from "react";

export interface InjectionContextType {
  targets: Record<string, HTMLElement | null>;
  injections: Record<string, number>;
  addTarget: (id: string, ref: HTMLElement | null) => void;
  addInjection: (id: string) => void;
  removeTarget: (id: string) => void;
  removeInjection: (id: string) => void;
}

export const InjectionContext = createContext<InjectionContextType | undefined>(
  undefined
);
