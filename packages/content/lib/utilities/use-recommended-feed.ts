import { Browsable } from "@gatsby-tv/types";

import { useInfinite } from "@lib/utilities/use-infinite";
import { InfiniteFetchResponse } from "@lib/types";

export function useRecommendedFeed(
  id?: string
): InfiniteFetchResponse<"content", Browsable> {
  const { data, ...props } = useInfinite<Browsable>((index) =>
    id
      ? `/user/${id}/listing/recommended?page=${index}`
      : `/listing/videos/popular?page=${index}`
  );

  return {
    content: data,
    ...props,
  };
}
