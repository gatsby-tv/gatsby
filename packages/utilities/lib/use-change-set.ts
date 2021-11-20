import { useReducer, useEffect, useCallback, DependencyList } from 'react';

type ChangeState = {
  initial: Record<string, unknown>;
  values: Record<string, unknown>;
  updates: Record<string, unknown>;
};

type ChangeAction =
  | { type: 'set'; value: unknown; id: string }
  | { type: 'reset'; initial: Record<string, unknown> };

export type ChangeSet = {
  pristine: boolean;
  updates: Record<string, unknown>;
  values: Record<string, unknown>;
  setValue: (value: unknown, id: string) => void;
};

export function useChangeSet(
  initial: Record<string, unknown>,
  deps: DependencyList
): ChangeSet {
  const [{ values, updates }, dispatch] = useReducer(
    (state: ChangeState, action: ChangeAction) => {
      switch (action.type) {
        case 'set':
          const values = {
            ...state.values,
            [action.id]:
              action.value !== undefined &&
              action.value !== state.initial[action.id]
                ? action.value
                : state.initial[action.id],
          };

          return {
            ...state,
            values,
            updates: Object.fromEntries(
              Object.entries(values).filter(
                ([key, value]) => value !== state.initial[key]
              )
            ),
          };

        case 'reset':
          return {
            ...state,
            initial: action.initial,
            values: action.initial,
            updates: {},
          };
      }
    },
    {
      initial,
      values: initial,
      updates: {},
    }
  );

  const setValue = useCallback(
    (value: unknown, id: string) => dispatch({ type: 'set', value, id }),
    []
  );

  useEffect(() => dispatch({ type: 'reset', initial }), deps);

  return {
    pristine: !Object.values(updates).length,
    updates,
    values,
    setValue,
  };
}
