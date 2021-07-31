import { useRef, useState, useCallback, Dispatch, SetStateAction } from 'react';

export function useVolatileKey(): [
  string | undefined,
  Dispatch<SetStateAction<string | undefined>>
];

export function useVolatileKey(
  initial: string | (() => string)
): [string, Dispatch<SetStateAction<string>>];

export function useVolatileKey(initial?: any): any {
  const key = useRef(0);
  const [value, setValue] = useState(() => {
    const update = typeof initial === 'function' ? initial() : initial;
    if (update == null) return;
    return `${update}.${key.current++}`;
  });

  const dispatch = useCallback(
    (value: SetStateAction<string | undefined>) =>
      setValue((current) => {
        const update =
          typeof value === 'function'
            ? value(current?.split('.').slice(0, -1).join('.'))
            : value;

        if (update == null) return;
        return `${update}.${key.current++}`;
      }),
    []
  );

  return [value, dispatch];
}

export function useVolatileState(): [number, Dispatch<void>] {
  const [state, setState] = useState(0);
  const dispatch = useCallback(() => setState((current) => current + 1), []);
  return [state, dispatch];
}
