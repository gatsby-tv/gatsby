import { ReactElement } from 'react';
import { DiscreteSize, Avatar, TextPlaceholder } from '@gatsby-tv/components';
import { Class } from '@gatsby-tv/utilities';

import styles from './Info.scss';

export interface SkeletonProps {
  avatar?: DiscreteSize;
}

export function Skeleton(props: SkeletonProps): ReactElement {
  const { avatar } = props;
  const classes = Class(styles.TextArea, styles.SkeletonTextArea);

  return (
    <div className={styles.Info}>
      <Avatar className={styles.Avatar} size={avatar} />
      <div className={classes}>
        <TextPlaceholder font="body-large" heading width={0.8} />
        <TextPlaceholder width={0.5} />
      </div>
    </div>
  );
}
