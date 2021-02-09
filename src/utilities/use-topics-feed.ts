import { TopicBrowsable } from "@gatsby-tv/types";

import { useInfinite } from "@src/utilities/use-infinite";
import { InfiniteFetchResponse } from "@src/types";

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
