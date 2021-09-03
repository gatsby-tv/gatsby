import { useContext, useEffect } from 'react';
import { useVolatileKey, ContextError } from '@gatsby-tv/utilities';

import { SignalContext, SignalContextType } from './context';

export function useSignalContext(): SignalContextType {
  const [signal, setSignal] = useVolatileKey();

  useEffect(() => {
    const id = setTimeout(setSignal, 700);
    return () => clearTimeout(id);
  }, [signal]);

  return [signal, setSignal];
}

export function useSignal(): SignalContextType {
  const context = useContext(SignalContext);

  if (!context) {
    throw new ContextError('Signal');
  }

  return context;
}
