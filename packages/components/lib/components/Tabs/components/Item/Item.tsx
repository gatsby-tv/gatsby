import { ReactElement } from 'react';
import { Class } from '@gatsby-tv/utilities';

import { Selection, SelectionItemProps } from '@lib/components/Selection';

import styles from './Item.scss';

export type ItemProps = SelectionItemProps;

export function Item(props: ItemProps): ReactElement {
  const { className, ...rest } = props;
  const classes = Class(className, styles.Item);
  return <Selection.Item className={classes} {...rest} />;
}
