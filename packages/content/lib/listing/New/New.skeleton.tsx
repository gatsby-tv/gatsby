import React from 'react';
import Preview from '@gatsby-tv/preview';
import { classNames } from '@gatsby-tv/utilities';

import { Video } from '@lib/video';
import { ListingContextType } from '@lib/utilities/listing';

import styles from './New.scss';

export type SkeletonProps = Omit<ListingContextType, 'id' | 'link'>;

export function Skeleton(props: SkeletonProps): React.ReactElement {
  const { preview = 'column', info = 'full', avatar } = props;

  const PreviewsMarkup = [...Array(24)].map((_, index) => (
    <Preview
      key={`Preview.Skeleton.${index}`}
      format={preview}
      info={<Video.Info format={info} avatar={avatar} />}
    />
  ));

  const classes = classNames(
    styles.Listing,
    preview === 'column' && styles.Column
  );

  return <div className={classes}>{PreviewsMarkup}</div>;
}
