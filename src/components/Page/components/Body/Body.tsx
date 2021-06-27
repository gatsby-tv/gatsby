import React from 'react';
import { classNames } from '@gatsby-tv/utilities';

import styles from '../../Page.module.scss';

export interface BodyProps {
  children?: React.ReactNode;
  className?: string;
  narrow?: boolean;
}

export function Body(props: BodyProps): React.ReactElement {
  const { children, className, narrow } = props;
  const classes = classNames(className, styles.Body, narrow && styles.Narrow);
  return <div className={classes}>{children}</div>;
}
