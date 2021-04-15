import React, { forwardRef, Ref } from "react";
import { classNames, ifExists } from "@gatsby-tv/utilities";

import { Spacing } from "@lib/types";

import styles from "./TextBox.scss";

export interface TextBoxProps extends React.HTMLAttributes<Element> {
  children?: React.ReactNode;
  className?: string;
  gap?: Spacing;
  clamp?: number;
}

export const TextBox = forwardRef<HTMLDivElement, TextBoxProps>(
  (props: TextBoxProps, ref: Ref<HTMLDivElement>) => {
    const { children, className, gap = "base", clamp, ...attributes } = props;

    const classes = classNames(
      className,
      styles[`TextBox-spacing-${gap}`],
      clamp && styles.Clamp
    );

    return (
      <div
        ref={ref}
        style={ifExists(clamp, { WebkitLineClamp: clamp })}
        className={classes}
        {...attributes}
      >
        {children}
      </div>
    );
  }
);

TextBox.displayName = "TextBox";
