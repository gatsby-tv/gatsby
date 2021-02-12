import { createContext } from "react";

import { Size } from "@lib/types";

export interface CarouselContextType {
  groups: number;
  gap: Size;
}

export const CarouselContext = createContext<CarouselContextType | undefined>(
  undefined
);
