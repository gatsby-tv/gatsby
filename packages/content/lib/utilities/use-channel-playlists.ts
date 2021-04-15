import { Browsable } from "@gatsby-tv/types";

import { useInfinite } from "@lib/utilities/use-infinite";
import { InfiniteFetchResponse } from "@lib/types";

export function useChannelPlaylists(id?: string): InfiniteFetchResponse<"playlists", Browsable> {
  const { data, ...props } = useInfinite<Browsable>(
    (index) => id ? `/channel/${id}/playlists?page=${index}` : null
  );

  return {
    playlists: data,
    ...props,
  };
}
