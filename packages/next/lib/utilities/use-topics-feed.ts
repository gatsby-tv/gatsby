import { TopicBrowsable } from "@gatsby-tv/types";

import { useInfinite } from "@lib/utilities/use-infinite";
import { InfiniteFetchResponse } from "@lib/types";

export function useTopicsFeed(): InfiniteFetchResponse<
  "topics",
  TopicBrowsable
> {
  const { data, ...props } = useInfinite<TopicBrowsable>(
    (index) => `/listing/topics?page=${index}`
  );

  return {
    topics: data,
    ...props,
  };
}
