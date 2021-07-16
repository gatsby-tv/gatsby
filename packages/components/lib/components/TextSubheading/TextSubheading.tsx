import React from 'react';
import { Class } from '@gatsby-tv/utilities';

import styles from './TextSubheading.scss';

export interface TextSubheadingProps {
  children?: React.ReactNode;
  className?: string;
}

export function TextSubheading(props: TextSubheadingProps): React.ReactElement {
  const { className, ...rest } = props;
  const classes = Class(className, styles.Subheading);
  return <h3 className={classes} {...rest} />;
}
