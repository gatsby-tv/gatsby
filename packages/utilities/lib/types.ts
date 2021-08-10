import { FormError } from '@lib/errors';
import { FormErrorState } from '@lib/form';

export interface EventHandler {
  (event?: any): void;
}

export interface Validator {
  (value: string, id: string): FormErrorState;
}

export type JsonResponse<T> = Omit<Response, 'json'> & {
  json: () => Promise<T>;
};

export type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: Record<string, unknown> | FormData;
};

export interface Fetch {
  <T = any>(
    endpoint: string,
    tokenOrOptions?: string | RequestOptions,
    options?: RequestOptions
  ): Promise<JsonResponse<T>>;
}
