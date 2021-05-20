import { useContext } from "react";
import { ContextError } from "@gatsby-tv/utilities";

import { SelectionContext, SelectionContextType } from "./context";

export function useSelection(): SelectionContextType {
  const selection = useContext(SelectionContext);

  if (!selection) {
    throw new ContextError("Selection");
  }

  return selection;
}
