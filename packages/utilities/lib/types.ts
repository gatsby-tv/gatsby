import { FormError } from '@lib/errors';
import { FormErrorState } from '@lib/form';

export interface EventHandler {
  (event?: any): void;
}

export interface Validator {
  (id: string, value: string): FormErrorState;
}

export interface Filter {
  (key: string, value: unknown): boolean;
}
