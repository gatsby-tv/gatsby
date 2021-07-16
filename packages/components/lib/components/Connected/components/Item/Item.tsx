import React from 'react';
import { Class } from '@gatsby-tv/utilities';

import styles from '../../Connected.scss';

export interface ItemProps extends React.HTMLAttributes<Element> {
  children?: React.ReactNode;
  className?: string;
}

export function Item(props: ItemProps): React.ReactElement {
  const { className, ...rest } = props;
  const classes = Class(className, styles.Item);
  return <div className={classes} {...rest} />;
}
