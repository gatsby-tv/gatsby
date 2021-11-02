import { useCallback } from 'react';
import { useSWRInfinite, KeyLoader } from 'swr';
import { Cursor } from '@gatsby-tv/types';

import { InfiniteFetchResponse } from '@lib/types';

export function useInfinite<T>(
  getKey: KeyLoader<Cursor<T>>
): InfiniteFetchResponse<'data', T> {
  // Refer to https://github.com/vercel/swr/issues/1345
  const {
    data: potentiallyErronousData,
    error,
    size,
    setSize,
  } = useSWRInfinite<Cursor<T>>(getKey, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const data =
  // @ts-ignore
    potentiallyErronousData === 1 ? undefined : potentiallyErronousData;

  const generator = useCallback(
    () => setSize((current) => current + 1),
    [setSize]
  );

  const loading =
    (!data && !error) ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');

  return {
    data: data
      ?.filter((page) => Boolean(page.content))
      .map((page) => page.content)
      .flat() as T[] | undefined,
    loading,
    generator,
    error,
  };
}
