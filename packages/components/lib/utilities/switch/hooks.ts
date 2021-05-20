import { useContext } from "react";
import { ContextError } from "@gatsby-tv/utilities";

import { SwitchContext, SwitchContextType } from "./context";

export function useSwitch(): SwitchContextType {
  const context = useContext(SwitchContext);

  if (!context) {
    throw new ContextError("Switch");
  }

  return context;
}
