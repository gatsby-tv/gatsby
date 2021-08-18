import { useEffect, Dispatch } from 'react';

import { useVolatileState } from '@lib/use-volatile-state';

export function useRepaint(): Dispatch<void> {
  const [state, mutate] = useVolatileState();
  useEffect(() => void document?.body?.offsetHeight, [state]);
  return mutate;
}
