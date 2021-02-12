import { useState, useRef, useCallback, RefObject } from "react";

export interface MenuType<T extends HTMLElement> {
  ref: RefObject<T>;
  active: boolean;
  toggle: () => void;
  deactivate: () => void;
}

export function useMenu<T extends HTMLElement>(): MenuType<T> {
  const [active, setActive] = useState(false);
  const ref = useRef<T>(null);

  const toggle = useCallback(() => setActive((state) => !state), []);
  const deactivate = useCallback(() => setActive(false), []);

  return { ref, active, toggle, deactivate };
}
