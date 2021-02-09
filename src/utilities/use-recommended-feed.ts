import { Browsable } from "@gatsby-tv/types";

import { useInfinite } from "@src/utilities/use-infinite";
import { InfiniteFetchResponse } from "@src/types";

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
