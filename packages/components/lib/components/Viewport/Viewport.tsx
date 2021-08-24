import { forwardRef, Ref, HTMLAttributes, ReactNode } from 'react';
import { Class } from '@gatsby-tv/utilities';

import { BorderRadius } from '@lib/types';

import styles from './Viewport.scss';

export interface ViewportProps
  extends Omit<HTMLAttributes<Element>, 'placeholder'> {
  children?: ReactNode;
  className?: string;
  overlay?: ReactNode;
  placeholder?: boolean;
  aspectRatio?: string | number;
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
      aspectRatio,
      ...attributes
    } = props;

    const classes = Class(
      className,
      styles.Placeholder,
      placeholder && styles.AlphaBackground,
      rounded && styles[`Radius-${rounded}`]
    );

    const OverlayMarkup = overlay ? (
      <div className={styles.Overlay}>{overlay}</div>
    ) : null;

    return (
      <figure
        ref={ref}
        style={aspectRatio ? { aspectRatio: String(aspectRatio) } : undefined}
        className={classes}
        {...attributes}
      >
        {children}
        {OverlayMarkup}
      </figure>
    );
  }
);

Viewport.displayName = 'Viewport';
