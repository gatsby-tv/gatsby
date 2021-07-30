import { FormError } from '@lib/errors';
import { FormErrorState } from '@lib/form';

export interface EventHandler {
  (event?: any): void;
}

export interface Validator {
  (value: string, id: string): FormErrorState;
}
