import { ReactElement } from 'react';
import { Image } from '@gatsby-tv/components';

import styles from './FeaturedChannels.scss';

export interface SkeletonProps {
  groups: number;
}

export function Skeleton(props: SkeletonProps): ReactElement {
  const { groups } = props;

  const SlidesMarkup = [...Array(groups)].map((_, index) => (
    <Image key={`Skeleton.${index}`} rounded="smallest" aspectRatio="1 / 2" />
  ));

  return <div className={styles.Skeleton}>{SlidesMarkup}</div>;
}
