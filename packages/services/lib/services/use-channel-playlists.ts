import { Browsable } from '@gatsby-tv/types';

import { useInfinite } from '@lib/utilities/use-infinite';
import { Cursor } from '@lib/utilities/cursor';
import { InfiniteFetchResponse } from '@lib/types';

export function useChannelPlaylists(
  id?: string,
  limit?: number
): InfiniteFetchResponse<'playlists', Browsable> {
  const { data, ...props } = useInfinite<Browsable>(
    Cursor(id ? `/channel/${id}/playlists` : null, limit)
  );

  return {
    playlists: data,
    ...props,
  };
}
