import { Browsable } from '@gatsby-tv/types';

import { useInfinite } from '@lib/utilities/use-infinite';
import { Cursor } from '@lib/utilities/cursor';
import { InfiniteFetchResponse } from '@lib/types';

export function useChannelShows(
  id?: string,
  limit?: number
): InfiniteFetchResponse<'shows', Browsable> {
  const { data, ...props } = useInfinite<Browsable>(
    Cursor(id ? `/channel/${id}/shows` : null, limit)
  );

  return {
    shows: data,
    ...props,
  };
}
