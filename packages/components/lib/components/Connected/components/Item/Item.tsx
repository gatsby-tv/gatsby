import { HTMLAttributes, ReactNode, ReactElement } from 'react';
import { Class, useStyles } from '@gatsby-tv/utilities';

export interface ItemProps extends HTMLAttributes<Element> {
  children?: ReactNode;
  className?: string;
}

export function Item(props: ItemProps): ReactElement {
  const { className, ...rest } = props;
  const styles = useStyles();
  const classes = Class(className, styles.Item);
  return <div className={classes} {...rest} />;
}
