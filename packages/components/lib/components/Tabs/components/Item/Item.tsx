import React from 'react';
import { classNames } from '@gatsby-tv/utilities';

import { Selection, SelectionItemProps } from '@lib/components/Selection';

import styles from '../../Tabs.scss';

export type ItemProps = SelectionItemProps;

export function Item(props: ItemProps): React.ReactElement {
  const { className, ...rest } = props;
  const classes = classNames(className, styles.Item);
  return <Selection.Item className={classes} {...rest} />;
}
