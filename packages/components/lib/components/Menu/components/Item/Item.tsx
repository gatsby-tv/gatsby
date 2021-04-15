import React from "react";
import { classNames } from "@gatsby-tv/utilities";

import { Connected } from "@lib/components/Connected";
import { Optional } from "@lib/components/Optional";
import { Icon } from "@lib/components/Icon";
import { Button, ButtonProps } from "@lib/components/Button";
import { IconSource } from "@lib/types";
import { useItem } from "@lib/utilities/item";

import styles from "../../Menu.scss";

export interface ItemProps extends Omit<ButtonProps, "unstyled"> {
  children?: React.ReactNode;
  className?: string;
  icon?: IconSource;
}

export function Item(props: ItemProps): React.ReactElement {
  const { children, className, icon: IconComponent, ...rest } = props;
  const { itemClass } = useItem();

  const classes = classNames(className, itemClass, styles.Item);

  const IconMarkup = IconComponent ? (
    <Icon src={IconComponent} size="smaller" />
  ) : null;

  return (
    <Connected.Item className={classes}>
      <Button unstyled {...rest}>
        <Optional
          component="div"
          active={Boolean(IconComponent)}
          $props={{ className: styles.Container }}
        >
          {IconMarkup}
          <div className={styles.Text}>{children}</div>
        </Optional>
      </Button>
    </Connected.Item>
  );
}
