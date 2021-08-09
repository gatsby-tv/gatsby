import { ReactNode, ReactElement } from 'react';
import { Class } from '@gatsby-tv/utilities';

import styles from './TextCaption.scss';

export interface TextCaptionProps {
  children?: ReactNode;
  className?: string;
}

export function TextCaption(props: TextCaptionProps): ReactElement {
  const { className, ...rest } = props;
  const classes = Class(className, styles.Caption);
  return <h4 className={classes} {...rest} />;
}
