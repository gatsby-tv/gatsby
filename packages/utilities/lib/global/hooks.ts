import { useContext } from "react";

import { GlobalContext, GlobalContextType } from "./context";

export function useGlobal(): GlobalContextType {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("No Global context provided for component.");
  }

  return context;
}
