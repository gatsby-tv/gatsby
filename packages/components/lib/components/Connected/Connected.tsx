import { ReactNode, ReactElement } from 'react';
import { Class } from '@gatsby-tv/utilities';

import { Item, ItemProps } from './components';
import styles from './Connected.scss';

export type { ItemProps as ConnectedItemProps };

export interface ConnectedProps {
  children?: ReactNode;
  className?: string;
  column?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

export function Connected(props: ConnectedProps): ReactElement {
  const { children, className, column, prefix, suffix } = props;

  const classes = Class(
    className,
    styles.Connected,
    column ? styles.ConnectedColumn : styles.ConnectedRow
  );

  const PrefixMarkup = prefix ? (
    <div className={styles.Connection}>{prefix}</div>
  ) : null;

  const SuffixMarkup = suffix ? (
    <div className={styles.Connection}>{suffix}</div>
  ) : null;

  return (
    <div className={classes}>
      {PrefixMarkup}
      {children}
      {SuffixMarkup}
    </div>
  );
}

Connected.Item = Item;
