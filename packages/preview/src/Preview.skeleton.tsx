import { ReactNode, ReactElement } from 'react';
import { Optional, Image } from '@gatsby-tv/components';
import { Class } from '@gatsby-tv/utilities';

import { PreviewFormat } from '@src/types';
import styles from '@src/Preview.scss';

export interface SkeletonProps {
  format?: PreviewFormat;
  info?: ReactNode;
}

export function Skeleton(props: SkeletonProps): ReactElement {
  const { format = 'column', info: Info } = props;

  const classes = Class(styles.Skeleton, styles[`Preview-${format}`]);

  const InfoMarkup = Info ? (
    <Optional
      component="div"
      active={format !== 'column'}
      $props={{ className: styles[`Item-${format}`] }}
    >
      {Info}
    </Optional>
  ) : null;

  return (
    <div className={classes}>
      <Image rounded="smallest" aspectRatio="16 / 9" />
      {InfoMarkup}
    </div>
  );
}
