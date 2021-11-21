import { useContext, useRef, useMemo, useEffect, DependencyList } from 'react';

import { ContextError } from '@lib/errors';

import { WhatChangedContext, WhatChangedContextType } from './context';

export function useWhatChangedContext(): WhatChangedContextType | undefined {
  // Yeah, we're breaking the rules for hooks, so what??
  if (process.env.NODE_ENV !== 'development') return;

  const keys = useRef({});
  return { keys };
}

export function useWhatChanged(
  keyOrDeps: string | DependencyList,
  depsWithKey: DependencyList = []
) {
  // Yeah! What he said!
  if (process.env.NODE_ENV !== 'development') return;

  const context = useContext(WhatChangedContext);

  if (!context) {
    throw new ContextError('WhatChanged');
  }

  const { keys } = context;

  const [key, deps] =
    typeof keyOrDeps === 'string' ? [keyOrDeps, depsWithKey] : ['', keyOrDeps];

  const mounted = useRef(false);

  const id = useMemo(() => {
    if (!keys.current[key]) keys.current[key] = 0;
    return `${key || 'effect'} ${keys.current[key]++}`;
  }, []);

  const tracker = useMemo(() => [...deps], []);

  useEffect(() => {
    const changes = deps.reduce((acc, dep, index) => {
      const old = tracker[index];
      const prefix = old !== dep ? '➤' : '⏺';
      tracker[index] = dep;

      return {
        ...acc,
        [`${prefix} ${index}`]: { 'Old Value': old, 'New Value': dep },
      };
    }, {});

    console.log(mounted.current ? '⏰' : '🏁', id);
    console.table(changes);
    mounted.current = true;
  }, deps);
}
