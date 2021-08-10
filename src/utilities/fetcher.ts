import { Fetcher } from '@gatsby-tv/utilities';

export const fetcher = Fetcher(
  process.env.NEXT_PUBLIC_WESTEGG_URL,
  process.env.NEXT_PUBLIC_WESTEGG_VERSION
);
