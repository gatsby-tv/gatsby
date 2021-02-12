import { useContext } from "react";

import { SwitchContext, SwitchContextType } from "./context";

export function useSwitch(): SwitchContextType {
  const context = useContext(SwitchContext);

  if (!context) {
    throw new Error("No Switch context provided for component.");
  }

  return context;
}
