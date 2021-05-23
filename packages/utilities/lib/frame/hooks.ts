import { useContext } from 'react';

import { ContextError } from '@lib/errors';

import { FrameContext, FrameContextType } from './context';

export function useFrame(): FrameContextType {
  const context = useContext(FrameContext);

  if (!context) {
    throw new ContextError('Frame');
  }

  return context;
}
