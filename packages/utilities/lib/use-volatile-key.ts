import {
  useRef,
  useState,
  useCallback,
  MutableRefObject,
  Dispatch,
  SetStateAction,
} from 'react';

import { ifExists } from '@lib/if-exists';

function getInitialValue(
  initial: string | undefined | (() => string),
  key: MutableRefObject<number>
): string | undefined | (() => string) {
  return typeof initial === 'function'
    ? () => `${initial()}.${key.current++}`
    : ifExists(initial, `${initial}.${key.current++}`);
}

function getValue(
  value: SetStateAction<string | undefined>,
  key: MutableRefObject<number>
): SetStateAction<string | undefined> {
  return typeof value === 'function'
    ? (current: string | undefined) => {
        const update = value(current?.split('.').shift());
        return ifExists(update, `${update}.${key.current++}`);
      }
    : ifExists(value, `${value}.${key.current++}`);
}

export function useVolatileKey(): [
  string | undefined,
  Dispatch<SetStateAction<string | undefined>>
];

export function useVolatileKey(
  initial: string | (() => string)
): [string, Dispatch<SetStateAction<string>>];

export function useVolatileKey(initial?: any): any {
  const ref = useRef(0);
  const [key, setKey] = useState(getInitialValue(initial, ref));
  const dispatch = useCallback((value) => setKey(getValue(value, ref)), []);
  return [key, dispatch];
}
