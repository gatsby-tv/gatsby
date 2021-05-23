import { useContext } from 'react';
import { ContextError } from '@gatsby-tv/utilities';

import { CarouselContext, CarouselContextType } from './context';

export function useCarousel(): CarouselContextType {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new ContextError('Carousel');
  }

  return context;
}
