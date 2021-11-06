import { ReactNode, ReactElement } from 'react';
import { Class, useStyles } from '@gatsby-tv/utilities';

import { Connected } from '@lib/components/Connected';
import { Optional } from '@lib/components/Optional';
import { Icon } from '@lib/components/Icon';
import { Button, ButtonProps } from '@lib/components/Button';
import { IconSource } from '@lib/types';
import { useItem } from '@lib/utilities/item';

export interface ItemProps extends Omit<ButtonProps, 'unstyled'> {
  children?: ReactNode;
  className?: string;
  icon?: IconSource;
}

export function Item(props: ItemProps): ReactElement {
  const { children, className, icon: IconComponent, ...rest } = props;
  const styles = useStyles();
  const { itemClass } = useItem();

  const classes = Class(className, itemClass, styles.Item);

  const IconMarkup = IconComponent ? (
    <Icon src={IconComponent} size="smaller" />
  ) : null;

  return (
    <Button unstyled {...rest}>
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
    </Button>
  );
}
