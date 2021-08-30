/* eslint-disable react-hooks/exhaustive-deps */

import {
  useContext,
  useState,
  useEffect,
  useCallback,
  DependencyList,
} from 'react';
import { ContextError, EventHandler } from '@gatsby-tv/utilities';

import { ModalContext, ModalContextType } from './context';

export function useModalContext(deps: DependencyList): ModalContextType {
  const [callbacks, setCallbacks] = useState<EventHandler[]>([]);

  const addModalCallback = useCallback(
    (callback: EventHandler) =>
      setCallbacks((current) => [...current, callback]),
    []
  );

  const removeModalCallback = useCallback(
    (callback: EventHandler) =>
      setCallbacks((current) => current.filter((entry) => entry !== callback)),
    []
  );

  useEffect(() => void callbacks.forEach((callback) => callback()), deps);

  useEffect(() => {
    function handler(event: any) {
      callbacks.forEach((callback) => callback(event));
    }

    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('pointerdown', handler);
  }, [callbacks]);

  return {
    addModalCallback,
    removeModalCallback,
  };
}

export function useModalCallback(
  callback: EventHandler | null | undefined,
  deps: DependencyList
): void {
  const context = useContext(ModalContext);

  if (!context) {
    throw new ContextError('Modal');
  }

  const { addModalCallback, removeModalCallback } = context;

  const _callback = useCallback(() => callback?.(), deps);

  useEffect(() => {
    addModalCallback(_callback);
    return () => removeModalCallback(_callback);
  }, [_callback]);
}
