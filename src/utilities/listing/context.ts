import { createContext } from "react";

export type ListingContextType = boolean;

export const ListingContext = createContext<ListingContextType | undefined>(
  undefined
);
