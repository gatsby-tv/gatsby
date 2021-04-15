import useSWR from "swr";
import { Channel } from "@gatsby-tv/types";

import { FetchResponse } from "@lib/types";

export function useFeaturedChannels(): FetchResponse<"channels", Channel[]> {
  const { data, error } = useSWR("/listing/featured/channels");

  return {
    channels: data,
    loading: !data && !error,
    error,
  };
}
