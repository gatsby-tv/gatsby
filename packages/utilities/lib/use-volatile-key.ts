import { useRef, useState, useCallback, Dispatch, SetStateAction } from "react";

import { ifExists } from "@lib/if-exists";

export function useVolatileKey(): [
  string | undefined,
  Dispatch<SetStateAction<string | undefined>>
];
export function useVolatileKey(
  initialValue: string | (() => string)
): [string, Dispatch<SetStateAction<string>>];

export function useVolatileKey(initialValue?: any): any {
  const key = useRef(0);
  const [signal, setSignal] = useState(
    ifExists(initialValue, `${initialValue}.${key.current++}`)
  );
  const dispatch = useCallback(
    (value) => setSignal(ifExists(value, `${value}.${key.current++}`)),
    []
  );
  return [signal, dispatch];
}
