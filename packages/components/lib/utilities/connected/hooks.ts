import { useContext } from "react";

import { ConnectedContext, ConnectedContextType } from "./context";

export function useConnected(): ConnectedContextType {
  const context = useContext(ConnectedContext);

  if (!context) {
    throw Error("No Connected context provided for component.");
  }

  return context;
}
