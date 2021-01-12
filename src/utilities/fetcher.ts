export function fetcher(endpoint: string, token?: string) {
  return fetch(`https://api.gatsby.sh${endpoint}`, {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
    headers: token
      ? {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      : {
          "Content-Type": "application/json",
        },
    redirect: "follow",
  }).then((resp) => resp.json());
}
