import React from 'react';
import { Class } from '@gatsby-tv/utilities';

import styles from './TextHeading.scss';

export interface TextHeadingProps {
  children?: React.ReactNode;
  className?: string;
}

export function TextHeading(props: TextHeadingProps): React.ReactElement {
  const { className, ...rest } = props;
  const classes = Class(className, styles.Heading);
  return <h2 className={classes} {...rest} />;
}
