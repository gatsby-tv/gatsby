import React from 'react';
import { TextPlaceholder } from '@gatsby-tv/components';

import styles from './Title.scss';

export function Skeleton(): React.ReactElement {
  return (
    <div className={styles.TitleSkeleton}>
      <TextPlaceholder font="display-small" heading width={0.6} />
      <TextPlaceholder font="body-large" width={0.3} />
    </div>
  );
}
