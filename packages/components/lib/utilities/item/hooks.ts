import { useContext } from 'react';
import { ContextError } from '@gatsby-tv/utilities';

import { ItemContext, ItemContextType } from './context';

export function useItem(): ItemContextType {
  const item = useContext(ItemContext);

  if (!item) {
    throw new ContextError('Item');
  }

  return item;
}
