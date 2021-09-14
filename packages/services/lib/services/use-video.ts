import useSWR from 'swr';
import { Video } from '@gatsby-tv/types';

import { FetchResponse } from '@lib/types';

export function useVideo(id?: string): FetchResponse<'video', Video> {
  const { data, error } = useSWR(id ? `/video/${id}` : null);

  return {
    video: data,
    loading: !error && !data,
    error,
  };
}
