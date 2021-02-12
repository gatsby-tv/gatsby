import { useContext } from "react";

import { AppContext, AppContextType } from "./context";

export function useApp(): AppContextType {
  const app = useContext(AppContext);

  if (!app) {
    throw new Error("No App context provided for component.");
  }

  return app;
}
