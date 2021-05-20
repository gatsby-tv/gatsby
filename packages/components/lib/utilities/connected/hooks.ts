import { useContext } from "react";
import { ContextError } from "@gatsby-tv/utilities";

import { ConnectedContext, ConnectedContextType } from "./context";

export function useConnected(): ConnectedContextType {
  const context = useContext(ConnectedContext);

  if (!context) {
    throw new ContextError("Connected");
  }

  return context;
}
