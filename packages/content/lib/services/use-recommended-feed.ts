import { Browsable } from '@gatsby-tv/types';

import { useInfinite } from '@lib/utilities/use-infinite';
import { Cursor } from '@lib/utilities/cursor';
import { InfiniteFetchResponse } from '@lib/types';

export function useRecommendedFeed(
  id?: string,
  limit?: number
): InfiniteFetchResponse<'content', Browsable> {
  const { data, ...props } = useInfinite<Browsable>(
    id
      ? Cursor(`/user/${id}/listing/recommended`, limit)
      : Cursor('/listing/videos/popular', limit)
  );

  return {
    content: data,
    ...props,
  };
}
