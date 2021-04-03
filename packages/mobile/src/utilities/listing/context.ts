import { createContext } from "react";

import { PreviewFormat } from "@gatsby-tv/preview";

export type ListingContextType = {
  format: PreviewFormat;
  groups: number;
  nochannel?: boolean;
  avatar?: string;
};

export const ListingContext = createContext<ListingContextType | undefined>(
  undefined
);
