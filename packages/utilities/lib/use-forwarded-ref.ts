/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRef, Ref, RefObject } from "react";

import { useIsomorphicLayoutEffect } from "@lib/use-isomorphic-layout-effect";

export function useForwardedRef<T>(ref: Ref<T>): RefObject<T> {
  const inner = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    if (!ref) return;
    if (typeof ref === "function") {
      ref(inner.current);
    } else {
      // shh... this is our little secret...
      (ref as any).current = inner.current;
    }
  });

  return inner;
}
