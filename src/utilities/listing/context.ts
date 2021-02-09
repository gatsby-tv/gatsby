import { createContext } from "react";

import { ListingFormat } from "@src/types";

export type ListingContextType = {
  groups: number;
  format: ListingFormat;
};

export const ListingContext = createContext<ListingContextType | undefined>(
  undefined
);
