import { useContext } from 'react';

import { ContextError } from '@lib/errors';

import { StylesContext, StylesContextType } from './context';

export function useStyles(): StylesContextType {
  const context = useContext(StylesContext);

  if (!context) {
    throw new ContextError('Styles');
  }

  return context;
}
