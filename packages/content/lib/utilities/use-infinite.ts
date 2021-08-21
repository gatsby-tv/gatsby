import { useCallback } from 'react';
import { useSWRInfinite, KeyLoader } from 'swr';
import { isCursor, CursorResponse } from '@gatsby-tv/types';

import { InfiniteFetchResponse } from '@lib/types';

export function useInfinite<T>(
  getKey: KeyLoader<CursorResponse<T[]>>
): InfiniteFetchResponse<'data', T> {
  const { data, error, size, setSize } = useSWRInfinite<CursorResponse<T[]>>(
    getKey,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const generator = useCallback(() => setSize((current) => current + 1), [
    setSize,
  ]);

  const loading =
    (!data && !error) ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');

  return {
    data: data
      ?.filter(isCursor)
      .map((page) => page.content)
      .flat() as T[] | undefined,
    loading,
    generator,
    error,
  };
}
