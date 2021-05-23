const westegg = process.env.NEXT_PUBLIC_WESTEGG_API_VERSION
  ? `${process.env.NEXT_PUBLIC_WESTEGG_URL}/${process.env.NEXT_PUBLIC_WESTEGG_API_VERSION}`
  : process.env.NEXT_PUBLIC_WESTEGG_URL;

export function fetcher(endpoint: string, token?: string): Promise<any> {
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
  }).then((resp) => resp.json());
}
