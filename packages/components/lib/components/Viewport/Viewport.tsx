import React, { forwardRef, Ref } from "react";
import { classNames } from "@gatsby-tv/utilities";

import { BorderRadius } from "@lib/types";

import styles from "./Viewport.scss";

export interface ViewportProps extends Omit<React.HTMLAttributes<Element>, "placeholder"> {
  children?: React.ReactNode;
  className?: string;
  overlay?: React.ReactNode;
  placeholder?: boolean;
  aspectRatio?: number;
  rounded?: BorderRadius;
}

export const Viewport = forwardRef<HTMLElement, ViewportProps>(
  (props: ViewportProps, ref: Ref<HTMLElement>) => {
    const {
      children,
      className,
      overlay,
      placeholder,
      rounded,
      aspectRatio = 0.5625,
      ...attributes
    } = props;

    const classes = classNames(
      styles.Placeholder,
      placeholder && styles.AlphaBackground,
      rounded && styles[`Radius-${rounded}`]
    );

    const OverlayMarkup = overlay ? (
      <div className={styles.Overlay}>{overlay}</div>
    ) : null;

    return (
      <figure ref={ref} className={className} {...attributes}>
        <div
          style={{ paddingTop: `${100 * aspectRatio}%` }}
          className={classes}
        />
        {children}
        {OverlayMarkup}
      </figure>
    );
  }
);

Viewport.displayName = "Viewport";
