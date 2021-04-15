import { useContext } from "react";

import { ItemContext, ItemContextType } from "./context";

export function useItem(): ItemContextType {
  const item = useContext(ItemContext);

  if (!item) {
    throw new Error("No Item context provided for component.");
  }

  return item;
}
