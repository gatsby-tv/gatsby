import { ReactElement } from 'react';
import { Class } from '@gatsby-tv/utilities';

import { FontSize } from '@lib/types';

import styles from './TextPlaceholder.scss';

export interface TextPlaceholderProps {
  className?: string;
  font?: FontSize;
  heading?: boolean;
  width?: number;
}

export function TextPlaceholder(props: TextPlaceholderProps): ReactElement {
  const { className, font = 'body', heading, width = 1 } = props;

  const classes = Class(
    className,
    styles.Placeholder,
    heading
      ? styles[`Placeholder-heading-${font}`]
      : styles[`Placeholder-${font}`]
  );

  return (
    <div
      style={{ width: `${100 * Math.min(width, 1)}%` }}
      className={classes}
    />
  );
}
