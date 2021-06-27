import { Filter } from '@lib/types';

export function nonEmpty(...targets: string[]): Filter {
  return targets
    ? (key: string, value: unknown) =>
        !targets.includes(key) || !Boolean(value)
    : (key: string, value: unknown) => !Boolean(value);
}
