import React from 'react';
import { Class } from '@gatsby-tv/utilities';

import { Item, ItemProps } from '../Item';
import styles from '../../TextMeta.scss';

export type ListProps = Omit<
  ItemProps,
  'element' | 'clamp' | 'dateTime' | 'value'
>;

export function List(props: ListProps): React.ReactElement {
  const { children, className } = props;
  const classes = Class(className, styles.List);
  return <span className={classes}>{children}</span>;
}
