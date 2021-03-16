import { Browsable } from "@gatsby-tv/types";

import { useInfinite } from "@lib/utilities/use-infinite";
import { InfiniteFetchResponse } from "@lib/types";

export function usePopularFeed(): InfiniteFetchResponse<"content", Browsable> {
  const { data, ...props } = useInfinite<Browsable>(
    (index) => `/listing/videos/popular?page=${index}`
  );

  return {
    content: data,
    ...props,
  };
}
