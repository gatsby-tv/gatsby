import { createContext } from "react";

import { PreviewFormat } from "@src/types";

export type ListingContextType = {
  groups: number;
  format: PreviewFormat;
};

export const ListingContext = createContext<ListingContextType | undefined>(
  undefined
);
