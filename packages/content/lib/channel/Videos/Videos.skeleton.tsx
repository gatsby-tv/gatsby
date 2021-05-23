import React from 'react';
import Preview from '@gatsby-tv/preview';
import { classNames } from '@gatsby-tv/utilities';

import { Info } from '@lib/video/Info';
import { ListingContextType } from '@lib/utilities/listing';

import styles from './Videos.scss';

export type SkeletonProps = Omit<
  ListingContextType,
  'id' | 'info' | 'avatar' | 'link'
>;

export function Skeleton(props: SkeletonProps): React.ReactElement {
  const { preview = 'column' } = props;

  const PreviewsMarkup = [...Array(24)].map((_, index) => (
    <Preview
      key={`Preview.Skeleton.${index}`}
      format={preview}
      info={<Info format="nochannel" />}
    />
  ));

  const classes = classNames(
    styles.Listing,
    preview === 'column' && styles.Column
  );

  return <div className={classes}>{PreviewsMarkup}</div>;
}
