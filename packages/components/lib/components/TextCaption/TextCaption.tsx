import React from 'react';
import { classNames } from '@gatsby-tv/utilities';

import styles from './TextCaption.scss';

export interface TextCaptionProps {
  children?: React.ReactNode;
  className?: string;
}

export function TextCaption(props: TextCaptionProps): React.ReactElement {
  const { className, ...rest } = props;
  const classes = classNames(className, styles.Caption);
  return <h4 className={classes} {...rest} />;
}
