import { Browsable } from '@gatsby-tv/types';

import { useInfinite } from '@lib/utilities/use-infinite';
import { InfiniteFetchResponse } from '@lib/types';

export function useRelatedFeed(
  id?: string
): InfiniteFetchResponse<'content', Browsable> {
  const { data, ...props } = useInfinite<Browsable>((index) =>
    id ? `/video/${id}/listing/related?page=${index}` : null
  );

  return {
    content: data,
    ...props,
  };
}
