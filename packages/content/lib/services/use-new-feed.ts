import { Browsable } from '@gatsby-tv/types';

import { useInfinite } from '@lib/utilities/use-infinite';
import { Cursor } from '@lib/utilities/cursor';
import { InfiniteFetchResponse } from '@lib/types';

export function useNewFeed(
  limit?: number
): InfiniteFetchResponse<'content', Browsable> {
  const { data, ...props } = useInfinite<Browsable>(
    Cursor('listing/videos/new', limit)
  );

  return {
    content: data,
    ...props,
  };
}
