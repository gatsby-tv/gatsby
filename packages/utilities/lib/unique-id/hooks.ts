import { useRef, useContext, MutableRefObject } from 'react';

import { ContextError } from '@lib/errors';

import {
  UniqueIdContext,
  UniqueIdContextType,
  UniqueIdGeneratorType,
} from './context';

function UniqueIdGenerator(
  prefix: string,
  keys: MutableRefObject<Record<string, number>>
): UniqueIdGeneratorType {
  return () => `${prefix}.${keys.current[prefix]++}`;
}

export function useUniqueIdGenerator(): UniqueIdContextType {
  const generators = useRef<Record<string, UniqueIdGeneratorType>>({});
  const keys = useRef<Record<string, number>>({});

  return (prefix: string) => {
    if (!generators.current[prefix]) {
      keys.current[prefix] = 0;
      generators.current[prefix] = UniqueIdGenerator(prefix, keys);
    }
    return generators.current[prefix];
  };
}

export function useUniqueId(prefix: string): string {
  const context = useContext(UniqueIdContext);

  if (!context) {
    throw new ContextError('UniqueId');
  }

  const id = useRef<string>();
  const generator = context(prefix);

  if (!id.current) {
    id.current = generator();
  }

  return id.current as string;
}
