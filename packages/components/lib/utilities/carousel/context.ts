import { createContext } from "react";

export interface CarouselContextType {
  groups: number;
}

export const CarouselContext = createContext<CarouselContextType | undefined>(
  undefined
);
