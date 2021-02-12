import { useContext } from "react";

import { ListingContext, ListingContextType } from "./context";

export function useListing(): ListingContextType {
  const context = useContext(ListingContext);

  if (context == null) {
    throw new Error("No Listing context provided for component.");
  }

  return context;
}
