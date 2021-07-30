import email from 'validator/lib/isEmail';

import { Validator } from '@lib/types';
import { FormError } from '@lib/errors';

export function isEmail(message: string): Validator {
  return (value: string, id: string) =>
    !value || email(value) ? undefined : new FormError(id, message);
}
