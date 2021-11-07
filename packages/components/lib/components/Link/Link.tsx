import { forwardRef, Ref, AnchorHTMLAttributes, ReactNode } from 'react';
import { Class } from '@gatsby-tv/utilities';

import styles from './Link.scss';

export interface LinkProps extends AnchorHTMLAttributes<Element> {
  children?: ReactNode;
  className?: string;
  href?: string;
  underline?: boolean;
  external?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (props: LinkProps, ref: Ref<HTMLAnchorElement>) => {
    const { children, className, href, external, underline, ...rest } = props;
    const target = external ? '_blank' : undefined;
    const rel = external ? 'noopener noreferrer' : undefined;

    const classes = Class(
      className,
      underline && styles.Underline
    );

    return href ? (
      <a
        ref={ref}
        className={classes}
        href={href}
        rel={rel}
        target={target}
        {...rest}
      >
        {children}
      </a>
    ) : (
      <div className={classes}>{children}</div>
    );
  }
);

Link.displayName = 'Link';
