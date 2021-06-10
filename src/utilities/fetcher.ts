const westegg = process.env.NEXT_PUBLIC_WESTEGG_API_VERSION
  ? `${process.env.NEXT_PUBLIC_WESTEGG_URL}/${process.env.NEXT_PUBLIC_WESTEGG_API_VERSION}`
  : process.env.NEXT_PUBLIC_WESTEGG_URL;

export function fetcher(
  endpoint: string,
  token?: string,
  options: Record<string, any> = {}
): Promise<any> {
  if (typeof options.body === 'object')
    options.body = JSON.stringify(options.body);

  return fetch(`${westegg}${endpoint}`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'same-origin',
    redirect: 'follow',
    headers: token
      ? {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      : {
          'Content-Type': 'application/json',
        },
    ...options,
  }).then((resp) => resp.json());
}
