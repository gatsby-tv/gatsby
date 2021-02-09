import { Video } from "@gatsby-tv/types";

import { useInfinite } from "@src/utilities/use-infinite";
import { InfiniteFetchResponse } from "@src/types";

export function useSubscriptionsFeed(
  id?: string
): InfiniteFetchResponse<"videos", Video> {
  const { data, ...props } = useInfinite<Video>((index) =>
    id ? `/user/${id}/listing/subscriptions/random?page=${index}` : null
  );

  return {
    videos: data,
    ...props,
  };
}
