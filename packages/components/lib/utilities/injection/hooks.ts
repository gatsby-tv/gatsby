import {
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactElement,
  Dispatch,
  SetStateAction,
} from 'react';
import { ContextError } from '@gatsby-tv/utilities';

import { InjectionContext, InjectionContextType } from './context';

export function useInjectionContext(): InjectionContextType {
  const [injections, setInjections] = useState<Record<string, number>>({});
  const [targets, setTargets] = useState<Record<string, HTMLElement | null>>(
    {}
  );

  const addTarget = useCallback(
    (id: string, ref: HTMLElement | null) =>
      setTargets((current) => ({ ...current, [id]: ref })),
    []
  );

  const removeTarget = useCallback(
    (id: string) => setTargets((current) => ({ ...current, [id]: null })),
    []
  );

  const addInjection = useCallback(
    (id: string) =>
      setInjections((current) => ({
        ...current,
        [id]: (current[id] ?? 0) + 1,
      })),
    []
  );

  const removeInjection = useCallback(
    (id: string) =>
      setInjections((current) => ({
        ...current,
        [id]: Math.max((current[id] ?? 0) - 1, 0),
      })),
    []
  );

  return {
    targets,
    injections,
    addTarget,
    addInjection,
    removeTarget,
    removeInjection,
  };
}

export function useInjectionTarget(
  id?: string
): Dispatch<SetStateAction<HTMLElement | null>> | null {
  const context = useContext(InjectionContext);

  if (!context) {
    throw new ContextError('Injection');
  }

  const { targets, injections, addTarget, removeTarget } = context;
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!id) return;
    addTarget(id, ref);
    return () => removeTarget(id);
  }, [id, ref]);

  return id && injections[id] ? setRef : null;
}

export function useInjection(id?: string): HTMLElement | null | undefined {
  const context = useContext(InjectionContext);

  if (!context) {
    throw new ContextError('Injection');
  }

  const { targets, addInjection, removeInjection } = context;

  useEffect(() => {
    if (!id) return;
    addInjection(id);
    return () => removeInjection(id);
  }, [id]);

  return id ? targets[id] : undefined;
}
