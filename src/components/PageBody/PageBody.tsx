import React from 'react';
import { classNames } from '@gatsby-tv/utilities';

import styles from './PageBody.module.scss';

export interface PageBodyProps {
  children?: React.ReactNode;
  className?: string;
  tight?: boolean;
}

export function PageBody(props: PageBodyProps): React.ReactElement {
  const { children, className, tight } = props;
  const classes = classNames(styles.Page, tight && styles.Tight);

  return (
    <div className={classes}>
      <div className={classNames(className, styles.Body)}>{children}</div>
    </div>
  );
}
