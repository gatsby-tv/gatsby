import { Browsable } from "@gatsby-tv/types";

import { useInfinite } from "@lib/utilities/use-infinite";
import { InfiniteFetchResponse } from "@lib/types";

export function useChannelShows(id?: string): InfiniteFetchResponse<"shows", Browsable> {
  const { data, ...props } = useInfinite<Browsable>(
    (index) => id ? `/channel/${id}/shows?page=${index}` : null
  );

  return {
    shows: data,
    ...props,
  };
}
