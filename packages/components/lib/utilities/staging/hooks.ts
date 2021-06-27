import { useContext } from 'react';
import { ContextError } from '@gatsby-tv/utilities';

import { StagingContext, StagingContextType } from './context';

export function useStaging(): StagingContextType {
  const context = useContext(StagingContext);

  if (!context) {
    throw new ContextError('Staging');
  }

  return context;
}
