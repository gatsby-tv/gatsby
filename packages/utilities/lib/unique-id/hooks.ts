import { useRef, useContext } from "react";

import {
  UniqueIdGenerator,
  UniqueIdContext,
  UniqueIdContextType,
} from "./context";

function newIdGenerator(prefix: string): UniqueIdGenerator {
  let index = 0;
  return () => `${prefix}-${index++}`;
}

export function useUniqueIdGenerator(): UniqueIdContextType {
  let generators: Record<string, UniqueIdGenerator> = {};
  return (prefix: string) => {
    if (!generators[prefix]) {
      generators = { ...generators, [prefix]: newIdGenerator(prefix) };
    }
    return generators[prefix];
  };
}

export function useUniqueId(prefix: string): string {
  const context = useContext(UniqueIdContext);

  if (!context) {
    throw new Error("No Unique ID context provided for component.");
  }

  const id = useRef<string | null>(null);
  const generator = context(prefix);

  if (!id.current) {
    id.current = generator();
  }

  return id.current;
}
