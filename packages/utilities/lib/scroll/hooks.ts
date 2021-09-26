/* eslint-disable react-hooks/exhaustive-deps */

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useContext,
  RefObject,
  SetStateAction,
  DependencyList,
} from 'react';

import { useRepaint } from '@lib/use-repaint';
import { EventHandler } from '@lib/types';
import { ContextError } from '@lib/errors';

import { ScrollContext, ScrollContextType } from './context';

export function useScrollContext<T extends HTMLElement>(
  ref: RefObject<T>
): ScrollContextType {
  const scroll = useRef<number>(0);
  const [callbacks, setCallbacks] = useState<EventHandler[]>([]);

  const addScrollListener = useCallback(
    (callback: EventHandler) =>
      setCallbacks((current) => [...current, callback]),
    []
  );

  const removeScrollListener = useCallback(
    (callback: EventHandler) =>
      setCallbacks((current) => current.filter((entry) => entry !== callback)),
    []
  );

  const setScroll = useCallback((value: SetStateAction<number>) => {
    const update = typeof value === 'function' ? value(scroll.current) : value;
    scroll.current = update;
    if (!ref.current) return;
    ref.current.scrollTop = update;
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    function handler(event: any) {
      callbacks.forEach((callback) => callback(event));
      scroll.current = event.target.scrollTop;
    }

    ref.current.addEventListener('scroll', handler);
    return () => ref.current?.removeEventListener('scroll', handler);
  }, [callbacks]);

  return {
    scroll,
    setScroll,
    addScrollListener,
    removeScrollListener,
  };
}

export function useScroll(): ScrollContextType {
  const context = useContext(ScrollContext);

  if (!context) {
    throw new ContextError('Scroll');
  }

  return context;
}

export function useStabilizedCallback(
  callback: (...args: any[]) => void,
  deps: DependencyList
): (...args: any[]) => any {
  const { scroll, setScroll } = useScroll();
  const repaint = useRepaint();

  const _callback = useCallback((...args: any[]) => {
    const last = scroll.current as number;
    callback(...args);
    repaint();
    setScroll(last);
  }, deps);

  return _callback;
}
