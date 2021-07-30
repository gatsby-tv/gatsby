import { Validator } from '@lib/types';
import { FormError } from '@lib/errors';

export function matches(values: string[], message: string): Validator {
  return (value: string, id: string) =>
    !value || values.some((match) => match === value) ? undefined : new FormError(id, message);
}
