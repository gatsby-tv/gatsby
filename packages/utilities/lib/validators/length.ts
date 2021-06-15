import { Validator } from '@lib/types';
import { FormError } from '@lib/errors';

export function minLength(minimum: number, message: string): Validator {
  return (id: string, value: string) =>
    value && value.length < minimum ? new FormError(id, message) : undefined;
}

export function maxLength(maximum: number, message: string): Validator {
  return (id: string, value: string) =>
    value && value.length > maximum ? new FormError(id, message) : undefined;
}
