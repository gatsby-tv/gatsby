import { Validators, Validator } from '@gatsby-tv/utilities';

import { fetcher } from '@src/utilities/fetcher';

export type DisplayNameValidationConfig = {
  required?: boolean;
};

export function isDisplayName(config: DisplayNameValidationConfig = {}): Validator[] {
  const { required = false } = config;
  return [
    required && Validators.required('Display name is required'),
    Validators.maxLength(
      50,
      'Display name cannot be longer than 50 characters'
    ),
  ].filter(Boolean) as Validator[];
}
