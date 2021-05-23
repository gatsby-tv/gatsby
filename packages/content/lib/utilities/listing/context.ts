import { createContext, FC } from 'react';
import { PreviewFormat } from '@gatsby-tv/preview';
import { DiscreteSize } from '@gatsby-tv/components';
import { Browsable } from '@gatsby-tv/types';

import { LinkProps, VideoInfoFormat } from '@lib/types';

export type ListingContextType = {
  id?: string;
  preview: PreviewFormat;
  info: VideoInfoFormat;
  avatar?: DiscreteSize;
  link?: FC<LinkProps>;
};

export const ListingContext = createContext<ListingContextType | undefined>(
  undefined
);
