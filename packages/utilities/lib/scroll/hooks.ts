/* eslint-disable react-hooks/exhaustive-deps */

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useContext,
  RefObject,
  DependencyList,
} from "react";

import { EventHandler } from "@lib/types";

import { ScrollContext, ScrollContextType } from "./context";

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

  const setScroll = useCallback((value: number) => {
    (scroll as any).current = value;
    if (ref.current) {
      ref.current.scrollTop = value;
    }
  }, []);

  useEffect(() => {
    function handler(event: any) {
      callbacks.forEach((callback) => callback(event));
      if (ref.current) {
        (scroll as any).current = ref.current.scrollTop;
      }
    }

    if (ref.current) {
      ref.current.onscroll = handler;
    }
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
    throw new Error("No Scroll context provided for component.");
  }

  return context;
}

export function useStabilizedCallback(
  callback: (...args: any[]) => void,
  deps: DependencyList
): (...args: any[]) => any {
  const { scroll, setScroll } = useScroll();
  const last = useRef<number | undefined>(undefined);

  const _callback = useCallback((...args: any[]) => {
    last.current = scroll.current as number;
    callback(...args);
  }, deps);

  useEffect(() => {
    if (last.current !== undefined) {
      setScroll(last.current);
    }
  }, deps);

  return _callback;
}
