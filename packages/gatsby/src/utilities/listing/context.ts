import { createContext } from "react";

import { PreviewFormat } from "@gatsby-tv/preview";

export type ListingContextType = {
  groups: number;
  format: PreviewFormat;
  nochannel?: boolean;
  avatar?: string;
};

export const ListingContext = createContext<ListingContextType | undefined>(
  undefined
);
