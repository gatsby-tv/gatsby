export function fetcher(endpoint: string, token?: string): Promise<any> {
  return fetch(`http://localhost:6001${endpoint}`, {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
    redirect: "follow",
    headers: token
      ? {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      : {
          "Content-Type": "application/json",
        },
  }).then((resp) => resp.json());
}
