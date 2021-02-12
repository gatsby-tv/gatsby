import { useContext } from "react";

import { SelectionContext, SelectionContextType } from "./context";

export function useSelection(): SelectionContextType {
  const selection = useContext(SelectionContext);

  if (!selection) {
    throw new Error("No Selection context provided for component.");
  }

  return selection;
}
