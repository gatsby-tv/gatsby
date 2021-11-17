import { forwardRef, Ref, ReactNode } from 'react';
import { Class, useStyles } from '@gatsby-tv/utilities';

import { Connected } from '@lib/components/Connected';
import { Icon } from '@lib/components/Icon';
import { Optional } from '@lib/components/Optional';
import {
  Link as LinkComponent,
  LinkProps as LinkComponentProps,
} from '@lib/components/Link';
import { IconSource } from '@lib/types';

export interface LinkProps extends Omit<LinkComponentProps, 'href'> {
  children?: ReactNode;
  className?: string;
  icon?: IconSource;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (props: LinkProps, ref: Ref<HTMLAnchorElement>) => {
    const { children, className, icon: IconComponent, ...rest } = props;
    const styles = useStyles();

    const classes = Class("Item", "Link", className, styles.Item);

    const IconMarkup = IconComponent ? (
      <Icon src={IconComponent} size="smaller" />
    ) : null;

    return (
      <Optional
        component={LinkComponent}
        $props={{ ref, ...rest }}
      >
        <Connected.Item className={classes}>
          <Optional
            component="div"
            active={Boolean(IconComponent)}
            $props={{ className: styles.Container }}
          >
            {IconMarkup}
            <div className={styles.Text}>{children}</div>
          </Optional>
        </Connected.Item>
      </Optional>
    );
  }
);
