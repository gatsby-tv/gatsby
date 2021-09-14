import { KeyLoader } from 'swr';
import { isCursor, CursorResponse } from '@gatsby-tv/types';

export function Cursor<T = any>(
  url: string | null,
  limit?: number
): KeyLoader<CursorResponse<T>> {
  if (!url) return (index: number, previous: CursorResponse<T> | null) => null;

  return limit
    ? (index: number, previous: CursorResponse<T> | null) => {
        if (previous && (!isCursor(previous) || !previous.cursor)) return null;
        if (!previous) return `${url}?limit=${limit}`;
        return `${url}?cursor=${previous.cursor}&limit=${limit}`;
      }
    : (index: number, previous: CursorResponse<T> | null) => {
        if (previous && (!isCursor(previous) || !previous.cursor)) return null;
        if (!previous) return url;
        return `${url}?cursor=${previous.cursor}`;
      };
}
