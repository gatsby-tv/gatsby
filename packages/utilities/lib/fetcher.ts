import { WestEggError } from '@gatsby-tv/types';

import { Fetch, Key, RequestOptions, JsonResponse } from '@lib/types';
import { NotImplementedError } from '@lib/errors';

export function Fetcher(
  base: string | undefined,
  version: string | undefined
): Fetch {
  if (!base) {
    return (..._args: any) =>
      Promise.reject(
        new NotImplementedError('Api provided to fetcher is undefined.')
      );
  }

  const api = version ? `${base}/${version}` : base;

  return (endpoint: string, ...keys: (RequestOptions | Key)[]) => {
    const [optionsOrKey] = keys.slice(-1);

    const options =
      typeof optionsOrKey === 'object' && !Array.isArray(optionsOrKey)
        ? (optionsOrKey as RequestOptions)
        : {};

    const {
      method: methodOption = 'GET',
      token,
      body,
      query = {},
      headers = {},
      ...rest
    } = options;

    const method = methodOption.toUpperCase();
    const url = new URL(`${api}${endpoint}`, window?.location?.href);

    if (method === 'GET') {
      Object.entries(query)
        .filter(([_key, value]) => Boolean(value))
        .forEach(([key, value]) => url.searchParams.set(key, String(value)));
    }

    if (token) {
      (headers as any)['Authorization'] = `Bearer ${token}`;
    }

    if (!(body instanceof FormData)) {
      (headers as any)['Content-Type'] = 'application/json';
    }

    const content =
      !body || ['GET', 'HEAD'].includes(method)
        ? undefined
        : body instanceof FormData
        ? body
        : JSON.stringify(body);

    return fetch(url.toString(), {
      method,
      headers,
      mode: 'cors',
      credentials: 'same-origin',
      redirect: 'follow',
      body: content,
      ...rest,
    }).then((resp) => {
      if (resp.ok) return resp;
      throw resp as JsonResponse<WestEggError>;
    });
  };
}
