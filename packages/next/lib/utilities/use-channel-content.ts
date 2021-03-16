import useSWR from "swr";
import { ChannelContent } from "@gatsby-tv/types";

import { FetchResponse } from "@lib/types";

export function useChannelContent(
  id?: string
): FetchResponse<"content", ChannelContent> {
  const { data, error } = useSWR(id ? `/channel/${id}/content` : null);

  return {
    content: data,
    loading: !error && !data,
    error,
  };
}
