export type JsonResponse<T> = Omit<Response, 'json'> & {
  json: () => Promise<T>;
};

export function fetcher<T = any>(
  endpoint: string,
  token?: string,
  options: RequestInit = {}
): Promise<JsonResponse<T>> {
  const westegg = process.env.NEXT_PUBLIC_WESTEGG_API_VERSION
    ? `${process.env.NEXT_PUBLIC_WESTEGG_URL}/${process.env.NEXT_PUBLIC_WESTEGG_API_VERSION}`
    : process.env.NEXT_PUBLIC_WESTEGG_URL;

  const { method = 'GET', body, headers = {}, ...rest } = options;

  const content =
    !body || method.toUpperCase() in ['GET', 'HEAD']
      ? undefined
      : body instanceof FormData
      ? body
      : JSON.stringify(body);

  return fetch(`${westegg}${endpoint}`, {
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
}
