import { useCallback } from 'react';
import { useSWRInfinite } from 'swr';

import { InfiniteFetchResponse } from '@lib/types';

export function useInfinite<T>(
  getKey: (index: number) => string | null
): InfiniteFetchResponse<'data', T> {
  const { data, error, size, setSize } = useSWRInfinite<T>(getKey, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const generator = useCallback(() => setSize((current) => current + 1), [
    setSize,
  ]);

  const loading =
    (!data && !error) ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');

  return {
    data: data?.flat() as T[] | undefined,
    loading,
    generator,
    error,
  };
}
