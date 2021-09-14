import { ReactElement } from 'react';
import Preview from '@gatsby-tv/preview';

import { Info } from '@lib/layout/Video/Info';
import { ListingContextType } from '@lib/utilities/listing';

import styles from './Related.scss';

export type SkeletonProps = Omit<ListingContextType, 'id' | 'link'>;

export function Skeleton(props: SkeletonProps): ReactElement {
  const { preview = 'row', info = 'full', avatar } = props;

  const PreviewsMarkup = [...Array(24)].map((_, index) => (
    <Preview
      key={`Preview.Skeleton.${index}`}
      format={preview}
      info={<Info format={info} avatar={avatar} />}
    />
  ));

  return <div className={styles.Listing}>{PreviewsMarkup}</div>;
}
