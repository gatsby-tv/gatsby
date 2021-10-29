import { Validators, FormError } from '@gatsby-tv/utilities';
import { GetUserHandleExistsResponse } from '@gatsby-tv/types';

import { fetcher } from '@src/utilities/fetcher';

export function isHandleAvailable(
  value: string,
  id: string
): Promise<FormError | undefined> | undefined {
  return value && value.length > 3
    ? fetcher<GetUserHandleExistsResponse>(`/user/${value}`)
        .then(() => new FormError(id, 'Handle not available'))
        .catch(() => undefined)
    : undefined;
}

export const isHandle = [
  Validators.minLength(4, 'Handle must be at least 4 characters long'),
  Validators.maxLength(20, 'Handle cannot be longer than 20 characters'),
  Validators.pattern(
    /^[a-zA-Z0-9_]+$/,
    'Handles can only consist of letters, numbers, and underscores'
  ),
  isHandleAvailable,
];
