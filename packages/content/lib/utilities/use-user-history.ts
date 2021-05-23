import { Browsable } from '@gatsby-tv/types';

import { useInfinite } from '@lib/utilities/use-infinite';
import { InfiniteFetchResponse } from '@lib/types';

export function useUserHistory(
  id?: string
): InfiniteFetchResponse<'videos', Browsable> {
  const { data, ...props } = useInfinite<Browsable>((index) =>
    id ? `/user/${id}/history?page=${index}` : null
  );

  return {
    videos: data,
    ...props,
  };
}
