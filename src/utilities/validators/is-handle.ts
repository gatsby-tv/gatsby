import { Validators, Validator, FormError } from '@gatsby-tv/utilities';
import { GetUserHandleExistsResponse } from '@gatsby-tv/types';

import { fetcher } from '@src/utilities/fetcher';

export function isHandleAvailable(
  id: string,
  value: string
): Promise<FormError | undefined> {
  return fetcher<GetUserHandleExistsResponse>(`/user/${value}`).then((resp) =>
    resp.ok ? new FormError(id, 'Handle not available') : undefined
  );
}

export type HandleValidationConfig = {
  required?: boolean;
};

export function isHandle(config: HandleValidationConfig = {}): Validator[] {
  const { required = false } = config;
  return [
    required && Validators.required('Handle is required'),
    Validators.minLength(4, 'Handle must be at least 4 characters long'),
    Validators.maxLength(20, 'Handle cannot be longer than 20 characters'),
    Validators.pattern(
      /^[a-zA-Z0-9_]+$/,
      'Handles can only consist of letters, numbers, and underscores'
    ),
    isHandleAvailable,
  ].filter(Boolean) as Validator[];
}
