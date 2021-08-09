import { ReactNode, ReactElement } from 'react';
import { Class } from '@gatsby-tv/utilities';

import styles from './TextHeading.scss';

export interface TextHeadingProps {
  children?: ReactNode;
  className?: string;
}

export function TextHeading(props: TextHeadingProps): ReactElement {
  const { className, ...rest } = props;
  const classes = Class(className, styles.Heading);
  return <h2 className={classes} {...rest} />;
}
