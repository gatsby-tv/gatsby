import { Validators } from '@gatsby-tv/utilities';

export const isDisplayName = [
  Validators.maxLength(50, 'Display name cannot be longer than 50 characters'),
];
