import { Validator } from '@lib/types';
import { FormError } from '@lib/errors';

export function required(message: string): Validator {
  return (id: string, value: string) =>
    value ? undefined : new FormError(id, message);
}
