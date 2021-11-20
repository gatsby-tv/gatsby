import { forwardRef, Ref, ReactNode } from 'react';
import { Class } from '@gatsby-tv/utilities';

import { Connected } from '@lib/components/Connected';
import { Icon } from '@lib/components/Icon';
import { Optional } from '@lib/components/Optional';
import {
  Link as LinkComponent,
  LinkProps as LinkComponentProps,
} from '@lib/components/Link';
import { IconSource } from '@lib/types';

import styles from '@lib/components/Menu/Menu.scss';

export interface LinkProps extends Omit<LinkComponentProps, 'href'> {
  children?: ReactNode;
  className?: string;
  icon?: IconSource;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (props: LinkProps, ref: Ref<HTMLAnchorElement>) => {
    const { children, className, icon: Source, ...rest } = props;

    const classes = Class("Item", className, styles.Item);

    const IconMarkup = Source ? (
      <Icon src={Source} size="smaller" />
    ) : null;

    return (
      <LinkComponent ref={ref} {...rest}>
        <Connected.Item className={classes}>
          <Optional
            active={Boolean(Source)}
            $props={{ className: styles.Container }}
          >
            {IconMarkup}
            <div className={styles.Text}>{children}</div>
          </Optional>
        </Connected.Item>
      </LinkComponent>
    );
  }
);
