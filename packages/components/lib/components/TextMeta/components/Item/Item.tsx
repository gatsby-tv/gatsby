import { forwardRef, Ref, HTMLAttributes, ReactNode } from 'react';
import { Class, Exists } from '@gatsby-tv/utilities';

import styles from '../../TextMeta.scss';

export interface ItemProps extends HTMLAttributes<Element> {
  children?: ReactNode;
  element?: string;
  className?: string;
  clamp?: number;
  dateTime?: string;
  value?: number;
}

export const Item = forwardRef<HTMLElement, ItemProps>(
  (props: ItemProps, ref: Ref<HTMLElement>) => {
    const {
      children,
      element: Element = 'span',
      className,
      clamp,
      ...rest
    } = props;

    const classes = Class(className, styles.Item, clamp && styles.Clamp);

    return (
      <Element
        ref={ref}
        style={Exists(clamp, { WebkitLineClamp: clamp })}
        className={classes}
        {...(rest as any)}
      >
        {children}
      </Element>
    );
  }
);

Item.displayName = 'Item';
