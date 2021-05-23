import React from 'react';
import { classNames } from '@gatsby-tv/utilities';

import { DisplaySize, TextElement } from '@lib/types';

import { Link, LinkProps } from './components/Link';
import styles from './TextDisplay.scss';

export type { LinkProps as TextDisplayLinkProps };

export interface TextDisplayProps {
  children?: React.ReactNode;
  id?: string;
  className?: string;
  element?: TextElement;
  size?: DisplaySize;
  thin?: boolean;
}

export function TextDisplay(props: TextDisplayProps): React.ReactElement {
  const {
    children,
    id,
    className,
    element: Element = 'h2',
    size = 'medium',
    thin,
  } = props;

  const classes = classNames(
    className,
    styles[`Display-${size}`],
    thin && styles.Thin
  );

  return (
    <Element id={id} className={classes}>
      {children}
    </Element>
  );
}

TextDisplay.Link = Link;
