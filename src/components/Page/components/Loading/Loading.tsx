import React from 'react';
import { Injection, Icon } from '@gatsby-tv/components';
import { Spinner } from '@gatsby-tv/icons';

import styles from '../../Page.module.scss';

export function Loading(): React.ReactElement {
  return (
    <Injection target="$foreground">
      <div className={styles.Loading}>
        <Icon className={styles.Spinner} src={Spinner} />
      </div>
    </Injection>
  );
}
