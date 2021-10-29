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
  token?: string;
  query?: Record<string, string | number>;
  body?: Record<string, unknown> | FormData;
};

export interface Fetch {
  <T = any>(
    endpoint: string,
    tokenOrOptions?: string | RequestOptions,
    options?: RequestOptions
  ): Promise<JsonResponse<T>>;
}

type ArgumentTuple = [any, ...unknown[]] | readonly [any, ...unknown[]];
export type Arguments =
  | string
  | ArgumentTuple
  | null
  | undefined
  | false

export type Key = Arguments | (() => Arguments);
