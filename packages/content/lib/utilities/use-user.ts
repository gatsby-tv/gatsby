import useSWR from "swr";
import { User } from "@gatsby-tv/types";

import { FetchResponse } from "@lib/types";

export function useUser(unique?: string): FetchResponse<"user", User> {
  const { data, error } = useSWR(unique ? `/user/${unique}` : null);

  return {
    user: data,
    loading: !error && !data,
    error,
  };
}
