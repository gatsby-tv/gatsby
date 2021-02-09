import useSWR from "swr";
import { UserContentFeeds } from "@gatsby-tv/types";

import { FetchResponse } from "@src/types";

export function useUserFeeds(
  id?: string
): FetchResponse<"feeds", UserContentFeeds> {
  const { data, error } = useSWR(id ? `/user/${id}/feeds` : null);

  return {
    feeds: data,
    loading: !error && !data,
    error,
  };
}
