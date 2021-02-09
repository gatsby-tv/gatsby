import { Browsable } from "@gatsby-tv/types";

import { useInfinite } from "@src/utilities/use-infinite";
import { InfiniteFetchResponse } from "@src/types";

export function useNewFeed(): InfiniteFetchResponse<"content", Browsable> {
  const { data, ...props } = useInfinite<Browsable>(
    (index) => `/listing/videos/new?page=${index}`
  );

  return {
    content: data,
    ...props,
  };
}
