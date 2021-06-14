import { Validator } from '@lib/types';
import { FormError } from '@lib/errors';

export function pattern(pattern: RegExp, message: string): Validator {
  return (id: string, value: string) =>
    pattern.test(value) ? undefined : new FormError(id, message);
}
