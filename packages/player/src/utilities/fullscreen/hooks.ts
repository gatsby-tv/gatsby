import { useContext } from 'react';
import { ContextError } from '@gatsby-tv/utilities';

import { FullscreenContext, FullscreenContextType } from './context';

export function useFullscreen(): FullscreenContextType {
  const context = useContext(FullscreenContext);

  if (!context) {
    throw new ContextError('Fullscreen');
  }

  return context;
}
