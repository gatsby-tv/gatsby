import { Validators, Validator } from '@gatsby-tv/utilities';

import { fetcher } from '@src/utilities/fetcher';

export function isDisplayName(): Validator[] {
  return [
    Validators.maxLength(
      50,
      'Display name cannot be longer than 50 characters'
    ),
  ];
}
