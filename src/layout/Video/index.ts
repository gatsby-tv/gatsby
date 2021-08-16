import { Layout, LayoutProps } from './components/Layout';
import { Related, RelatedProps } from './components/Related';
import { Info, InfoProps } from './components/Info';

export type {
  LayoutProps as VideoLayoutProps,
  RelatedProps as VideoRelatedProps,
  InfoProps as VideoInfoProps,
};

export const Video = {
  Layout,
  Related,
  Info,
};
