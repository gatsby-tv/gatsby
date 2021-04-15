import React, { forwardRef, Ref } from "react";
import { ExtendRight } from "@gatsby-tv/icons";
import { classNames } from "@gatsby-tv/utilities";

import {
  Link as LinkBase,
  LinkProps as LinkBaseProps,
} from "@lib/components/Link";
import { Icon } from "@lib/components/Icon";
import { DisplaySize, TextElement } from "@lib/types";

import styles from "../../TextDisplay.scss";

export interface LinkProps extends Omit<LinkBaseProps, "underline"> {
  children?: string | string[];
  id?: string;
  className?: string;
  element?: TextElement;
  size?: DisplaySize;
  thin?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (props: LinkProps, ref: Ref<HTMLAnchorElement>) => {
    const {
      children,
      className,
      element: Element = "h2",
      size = "medium",
      thin,
      ...linkProps
    } = props;

    const classes = classNames(
      className,
      styles[`Display-${size}`],
      thin && styles.Thin
    );

    return (
      <div className={styles.FitContent}>
        <LinkBase ref={ref} underline {...linkProps}>
          <div className={styles.Link}>
            <Element className={classes}>
              {children}
            </Element>
            <Icon
              src={ExtendRight}
              size={size === "large" ? "large" : "small"}
            />
          </div>
        </LinkBase>
      </div>
    );
  }
);
