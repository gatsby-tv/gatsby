import { Video } from '@gatsby-tv/types';

import { useInfinite } from '@lib/utilities/use-infinite';
import { Cursor } from '@lib/utilities/cursor';
import { InfiniteFetchResponse } from '@lib/types';

export function useSubscriptionsFeed(
  id?: string,
  limit?: number
): InfiniteFetchResponse<'videos', Video> {
  const { data, ...props } = useInfinite<Video>(
    Cursor(id ? `/user/${id}/listing/subscriptions` : null, limit)
  );

  return {
    videos: data,
    ...props,
  };
}
