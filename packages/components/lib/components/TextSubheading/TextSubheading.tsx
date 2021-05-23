import React from 'react';
import { classNames } from '@gatsby-tv/utilities';

import styles from './TextSubheading.scss';

export interface TextSubheadingProps {
  children?: React.ReactNode;
  className?: string;
}

export function TextSubheading(props: TextSubheadingProps): React.ReactElement {
  const { className, ...rest } = props;
  const classes = classNames(className, styles.Subheading);
  return <h3 className={classes} {...rest} />;
}
