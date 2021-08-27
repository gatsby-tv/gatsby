import { forwardRef, Ref, HTMLAttributes, ReactNode } from 'react';
import { Class } from '@gatsby-tv/utilities';

import { useSupports } from '@lib/utilities/supports';
import { BorderRadius } from '@lib/types';

import styles from './Viewport.scss';

function AspectRatio(aspectRatio: string | number): string {
  const [width, height = '1'] = String(aspectRatio)
    .split('/')
    .map((dimension) => dimension.trim());

  return `${100 * (Number(height) / Number(width))}%`;
}

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

    const { hasAspectRatio } = useSupports();

    const classes = Class(
      className,
      styles.Placeholder,
      placeholder && styles.AlphaBackground,
      rounded && styles[`Radius-${rounded}`]
    );

    const OverlayMarkup = overlay ? (
      <div className={styles.Overlay}>{overlay}</div>
    ) : null;

    const BeforeMarkup =
      aspectRatio && !hasAspectRatio ? (
        <div style={{ paddingTop: AspectRatio(aspectRatio) }} />
      ) : null;

    return (
      <figure
        ref={ref}
        style={aspectRatio ? { aspectRatio: String(aspectRatio) } : undefined}
        className={classes}
        {...attributes}
      >
        {BeforeMarkup}
        {children}
        {OverlayMarkup}
      </figure>
    );
  }
);

Viewport.displayName = 'Viewport';
