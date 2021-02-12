/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRef, RefObject } from "react";

import { useIsomorphicLayoutEffect } from "@lib/use-isomorphic-layout-effect";

export function useParentRef<T extends HTMLElement, P = HTMLElement>(
  ref: RefObject<T>
): RefObject<P> {
  const parent = useRef<P>(null);

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;
    (parent as any).current = ref.current.parentElement;
  });

  return parent;
}
