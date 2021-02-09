import { Browsable } from "@gatsby-tv/types";

import { useInfinite } from "@src/utilities/use-infinite";
import { InfiniteFetchResponse } from "@src/types";

export function useRelatedFeed(
  id?: string
): InfiniteFetchResponse<"content", Browsable> {
  const { data, ...props } = useInfinite<Browsable>((index) =>
    id ? `/video/${id}/listing/related?page=${index}` : null
  );

  return {
    content: data,
    ...props,
  };
}
