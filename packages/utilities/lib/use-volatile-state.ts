import { useState, useCallback, Dispatch } from 'react';

export function useVolatileState(): [number, Dispatch<void>] {
  const [state, setState] = useState(0);
  const dispatch = useCallback(() => setState((current) => current + 1), []);
  return [state, dispatch];
}
