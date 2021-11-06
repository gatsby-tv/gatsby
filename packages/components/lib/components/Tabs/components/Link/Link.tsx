import { forwardRef, Ref } from 'react';
import { Class } from '@gatsby-tv/utilities';

import {
  Link as LinkBase,
  LinkProps as LinkBaseProps,
} from '@lib/components/Link';
import { Selection, SelectionItemProps } from '@lib/components/Selection';

import styles from './Link.scss';

export type LinkProps = SelectionItemProps & LinkBaseProps;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (props: LinkProps, ref: Ref<HTMLAnchorElement>) => {
    const {
      children,
      id,
      className,
      option,
      'aria-controls': ariaControls,
      ...linkProps
    } = props;

    const classes = Class(className, styles.Item);

    return (
      <Selection.Item
        id={id}
        className={classes}
        option={option}
        aria-controls={ariaControls}
      >
        <LinkBase ref={ref} className={styles.Link} {...linkProps}>
          {children}
        </LinkBase>
      </Selection.Item>
    );
  }
);

Link.displayName = 'Link';
