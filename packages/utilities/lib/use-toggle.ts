import { useState, useCallback } from "react";

export type ToggleType = [
  boolean | undefined,
  () => void,
  (value: boolean) => void
];

export function useToggle(initial?: boolean): ToggleType {
  const [toggle, setToggle] = useState(initial ?? undefined);

  return [
    toggle,
    useCallback(() => setToggle((state) => !state), []),
    useCallback((value: boolean) => setToggle(value), []),
  ];
}
