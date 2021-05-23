import React from 'react';
import { classNames } from '@gatsby-tv/utilities';

import styles from './TextHeading.scss';

export interface TextHeadingProps {
  children?: React.ReactNode;
  className?: string;
}

export function TextHeading(props: TextHeadingProps): React.ReactElement {
  const { className, ...rest } = props;
  const classes = classNames(className, styles.Heading);
  return <h2 className={classes} {...rest} />;
}
