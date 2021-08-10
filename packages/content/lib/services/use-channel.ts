import useSWR from 'swr';
import { Channel } from '@gatsby-tv/types';

import { FetchResponse } from '@lib/types';

export function useChannel(unique?: string): FetchResponse<'channel', Channel> {
  const { data, error } = useSWR(unique ? `/channel/${unique}` : null);

  return {
    channel: data,
    loading: !error && !data,
    error,
  };
}
