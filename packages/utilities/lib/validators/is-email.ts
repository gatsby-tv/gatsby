import email from 'validator/lib/isEmail';

import { Validator } from '@lib/types';
import { FormError } from '@lib/errors';

export function isEmail(message: string): Validator {
  return (id: string, value: string) =>
    email(value) ? undefined : new FormError(id, message);
}
