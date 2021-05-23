import { useContext } from 'react';
import { ContextError } from '@gatsby-tv/utilities';

import { AppContext, AppContextType } from './context';

export function useApp(): AppContextType {
  const app = useContext(AppContext);

  if (!app) {
    throw new ContextError('App');
  }

  return app;
}
