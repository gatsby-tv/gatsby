import { Layout, LayoutProps } from './Layout';
import { Carousel } from './Carousel';
import { Recommended, RecommendedProps } from './Recommended';

export type {
  RecommendedProps as HomeRecommendedProps,
  LayoutProps as HomeLayoutProps,
};

export const Home = {
  Layout,
  Carousel,
  Recommended,
};
