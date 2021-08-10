import { Fetch, RequestOptions } from '@lib/types';
import { NotImplementedError } from '@lib/errors';

type RequestConfigurationType = {
  token?: string;
  options: RequestOptions;
};

function RequestConfiguration(
  tokenOrOptions: string | RequestOptions | null | undefined,
  optionsWithToken: RequestOptions
): RequestConfigurationType {
  return typeof tokenOrOptions === 'object'
    ? {
        options: tokenOrOptions as RequestOptions,
      }
    : {
        token: tokenOrOptions,
        options: optionsWithToken,
      };
}

export function Fetcher(
  api: string | undefined,
  version: string | undefined
): Fetch {
  if (!api) {
    return (...args: any) =>
      Promise.reject(
        new NotImplementedError('Api provided to fetcher is undefined.')
      );
  }

  const url = version ? `${api}/${version}` : api;

  return (
    endpoint: string,
    tokenOrOptions?: string | RequestOptions,
    optionsWithToken: RequestOptions = {}
  ) => {
    const { token, options } = RequestConfiguration(
      tokenOrOptions,
      optionsWithToken
    );

    const { method = 'GET', body, headers = {}, ...rest } = options;

    const content =
      !body || ['GET', 'HEAD'].includes(method.toUpperCase())
        ? undefined
        : body instanceof FormData
        ? body
        : JSON.stringify(body);

    return fetch(`${url}${endpoint}`, {
      method: method.toUpperCase(),
      mode: 'cors',
      credentials: 'same-origin',
      redirect: 'follow',
      body: content,
      headers:
        token && body instanceof FormData
          ? {
              Authorization: `Bearer ${token}`,
              ...headers,
            }
          : token
          ? {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
              ...headers,
            }
          : {
              'Content-Type': 'application/json',
              ...headers,
            },
      ...rest,
    });
  };
}
