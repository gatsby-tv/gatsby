import React from "react";
import { classNames } from "@gatsby-tv/utilities";

import { Item, ItemProps } from "./components";
import styles from "./Connected.scss";

export type { ItemProps as ConnectedItemProps };

export interface ConnectedProps {
  children?: React.ReactNode;
  className?: string;
  column?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export function Connected(props: ConnectedProps) {
  const { children, className, column, prefix, suffix } = props;

  const classes = classNames(
    className,
    styles.Connected,
    column ? styles.ConnectedColumn : styles.ConnectedRow
  );

  const PrefixMarkup = prefix ? (
    <div className={styles.Connection}>{prefix}</div>
  ) : null;

  const SuffixMarkup = suffix ? (
    <div className={styles.Connection}>{suffix}</div>
  ) : null;

  return (
    <div className={classes}>
      {PrefixMarkup}
      {children}
      {SuffixMarkup}
    </div>
  );
}

Connected.Item = Item;
