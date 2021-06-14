import { FormError } from '@lib/errors';

export interface EventHandler {
  (event?: any): void;
}

export interface Validator {
  (id: string, value: string): FormError | undefined;
}
