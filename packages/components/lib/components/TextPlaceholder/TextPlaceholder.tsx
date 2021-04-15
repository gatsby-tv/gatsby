import React from "react";
import { classNames } from "@gatsby-tv/utilities";

import { FontSize } from "@lib/types";

import styles from "./TextPlaceholder.scss";

export interface TextPlaceholderProps {
  className?: string;
  font?: FontSize;
  heading?: boolean;
  width?: number;
}

export function TextPlaceholder(
  props: TextPlaceholderProps
): React.ReactElement {
  const { className, font = "body", heading, width = 1 } = props;

  const classes = classNames(
    className,
    styles.Placeholder,
    heading
      ? styles[`Placeholder-heading-${font}`]
      : styles[`Placeholder-${font}`]
  );

  return (
    <div
      style={{ width: `${100 * Math.min(width, 1)}%` }}
      className={classes}
    />
  );
}
