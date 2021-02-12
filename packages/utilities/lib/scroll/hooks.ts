/* eslint-disable react-hooks/exhaustive-deps */

import {
  useEffect,
  useRef,
  useCallback,
  useContext,
  DependencyList,
} from "react";

import { ScrollContext, ScrollContextType } from "./context";

export function useScroll(): ScrollContextType {
  const scroll = useContext(ScrollContext);

  if (!scroll) {
    throw new Error("No Scroll context provided for component.");
  }

  return scroll;
}

export function useStabilizedCallback(
  callback: (...args: any[]) => void,
  deps: DependencyList
): (...args: any[]) => any {
  const { scrollPosition, setScrollPosition } = useScroll();
  const lastPosition = useRef<number | undefined>(undefined);

  const _callback = useCallback((...args: any[]) => {
    lastPosition.current = scrollPosition.current as number;
    callback(...args);
  }, deps);

  useEffect(() => {
    if (lastPosition.current !== undefined) {
      setScrollPosition(lastPosition.current);
    }
  }, deps);

  return _callback;
}
