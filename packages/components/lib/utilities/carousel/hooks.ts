import { useContext } from "react";

import { CarouselContext, CarouselContextType } from "./context";

export function useCarousel(): CarouselContextType {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error("No Carousel context provided for component.");
  }

  return context;
}
