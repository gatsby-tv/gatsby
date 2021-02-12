import { createContext } from "react";

export interface AppContextType {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
