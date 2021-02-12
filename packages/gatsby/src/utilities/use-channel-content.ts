import useSWR from "swr";
import { ChannelContent } from "@gatsby-tv/types";

import { FetchResponse } from "@src/types";

export function useChannelContent(
  id: string
): FetchResponse<"content", ChannelContent> {
  const { data, error } = useSWR(`/channel/${id}/content`);

  return {
    content: data,
    loading: !error && !data,
    error,
  };
}
