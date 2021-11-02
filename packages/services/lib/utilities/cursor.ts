import { KeyLoader } from 'swr';
import { Cursor as CursorResponse } from '@gatsby-tv/types';

export function Cursor<T = any>(
  url: string | null,
  limit?: number
): KeyLoader<CursorResponse<T>> {
  if (!url) return (_index: number, _previous: CursorResponse<T> | null) => null;

  return limit
    ? (_index: number, previous: CursorResponse<T> | null) => {
        if (previous && !previous?.cursor) return null;
        if (!previous) return `${url}?limit=${limit}`;
        return `${url}?cursor=${previous.cursor}&limit=${limit}`;
      }
    : (_index: number, previous: CursorResponse<T> | null) => {
        if (previous && !previous?.cursor) return null;
        if (!previous) return url;
        return `${url}?cursor=${previous.cursor}`;
      };
}
