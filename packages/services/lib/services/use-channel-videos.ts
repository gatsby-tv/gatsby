import { Browsable } from '@gatsby-tv/types';

import { useInfinite } from '@lib/utilities/use-infinite';
import { Cursor } from '@lib/utilities/cursor';
import { InfiniteFetchResponse } from '@lib/types';

export function useChannelVideos(
  id?: string,
  limit?: number
): InfiniteFetchResponse<'videos', Browsable> {
  const { data, ...props } = useInfinite<Browsable>(
    Cursor(id ? `/channel/${id}/videos` : null, limit)
  );

  return {
    videos: data,
    ...props,
  };
}
