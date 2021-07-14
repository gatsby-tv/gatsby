import { Layout, LayoutProps } from './components/Layout';
import { Carousel } from './components/Carousel';
import { Recommended, RecommendedProps } from './components/Recommended';

export type {
  RecommendedProps as HomeRecommendedProps,
  LayoutProps as HomeLayoutProps,
};

export const Home = {
  Layout,
  Carousel,
  Recommended,
};
