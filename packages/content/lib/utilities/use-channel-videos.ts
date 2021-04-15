import { Browsable } from "@gatsby-tv/types";

import { useInfinite } from "@lib/utilities/use-infinite";
import { InfiniteFetchResponse } from "@lib/types";

export function useChannelVideos(
  id?: string
): InfiniteFetchResponse<"videos", Browsable> {
  const { data, ...props } = useInfinite<Browsable>((index) =>
    id ? `/channel/${id}/videos?page=${index}` : null
  );

  return {
    videos: data,
    ...props,
  };
}
