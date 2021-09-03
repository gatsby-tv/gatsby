import { useContext } from 'react';
import { ContextError } from '@gatsby-tv/utilities';

import { QualityContext, QualityContextType } from './context';

export function useQuality(): QualityContextType {
  const context = useContext(QualityContext);

  if (!context) {
    throw new ContextError('Quality');
  }

  return context;
}
