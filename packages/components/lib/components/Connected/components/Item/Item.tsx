import { HTMLAttributes, ReactNode, ReactElement } from 'react';
import { Class } from '@gatsby-tv/utilities';

import styles from '../../Connected.scss';

export interface ItemProps extends HTMLAttributes<Element> {
  children?: ReactNode;
  className?: string;
}

export function Item(props: ItemProps): ReactElement {
  const { className, ...rest } = props;
  const classes = Class(className, styles.Item);
  return <div className={classes} {...rest} />;
}
