import {
  useRef,
  useState,
  useEffect,
  useCallback,
  DependencyList,
} from 'react';

export type ChangeState = {
  pristine: boolean;
  updates: Record<string, unknown>;
  values: Record<string, unknown>;
  setValue: (value: unknown, id: string) => void;
};

export function useChangeSet(
  initial: Record<string, unknown>,
  deps: DependencyList
): ChangeState {
  const ref = useRef(initial);
  const [values, setValues] = useState<Record<string, unknown>>(initial);
  const [updates, setUpdates] = useState<Record<string, unknown>>({});
  const pristine = Object.values(updates).length === 0;

  const setValue = useCallback(
    (value: unknown, id: string) =>
      setValues((current) => ({
        ...current,
        [id]:
          value !== undefined && value !== ref.current[id]
            ? value
            : ref.current[id],
      })),
    []
  );

  useEffect(
    () =>
      setUpdates(
        Object.fromEntries(
          Object.entries(values).filter(
            ([key, value]) => value !== ref.current[key]
          )
        )
      ),
    [values]
  );

  useEffect(() => {
    setValues(initial);
    setUpdates({});
    ref.current = initial;
  }, deps);

  return { pristine, updates, values, setValue };
}
