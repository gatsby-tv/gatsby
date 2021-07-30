import { Validator } from '@lib/types';
import { FormError } from '@lib/errors';

export function pattern(pattern: RegExp, message: string): Validator {
  return (value: string, id: string) =>
    !value || pattern.test(value) ? undefined : new FormError(id, message);
}
