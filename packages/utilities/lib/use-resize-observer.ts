/// <reference types="resize-observer-browser" />

import { RefObject } from 'react';

import { useIsomorphicLayoutEffect } from '@lib/use-isomorphic-layout-effect';

export interface ResizeCallback {
  (content: ResizeObserverSize): void;
}

export function useResizeObserver<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T> | T | null | undefined,
  callback: ResizeCallback
): void {
  const element = ref instanceof HTMLElement ? ref : ref?.current;

  useIsomorphicLayoutEffect(() => {
    if (!element) return;

    const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          callback(
            Array.isArray(entry.contentBoxSize)
              ? entry.contentBoxSize[0]
              : entry.contentBoxSize
          );
        } else {
          callback({
            inlineSize: entry.contentRect.width,
            blockSize: entry.contentRect.height,
          });
        }
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [element]);
}
