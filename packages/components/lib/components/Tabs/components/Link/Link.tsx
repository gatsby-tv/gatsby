import React, { forwardRef, Ref } from "react";
import { classNames } from "@gatsby-tv/utilities";

import {
  Link as LinkBase,
  LinkProps as LinkBaseProps,
} from "@lib/components/Link";
import { Selection, SelectionItemProps } from "@lib/components/Selection";

import styles from "../../Tabs.scss";

export type LinkProps = SelectionItemProps & LinkBaseProps;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (props: LinkProps, ref: Ref<HTMLAnchorElement>) => {
    const {
      children,
      id,
      className,
      option,
      "aria-controls": ariaControls,
      ...linkProps
    } = props;

    const itemProps = {
      id,
      className,
      option,
      ariaControls,
    };

    const classes = classNames(className, styles.Item);

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

Link.displayName = "Link";
