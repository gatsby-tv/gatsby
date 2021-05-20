import { useContext } from "react";

import { ContextError } from "@lib/errors";

import { GlobalContext, GlobalContextType } from "./context";

export function useGlobal(): GlobalContextType {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new ContextError("Global");
  }

  return context;
}
