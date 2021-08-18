import { forwardRef, Ref, HTMLAttributes, ReactNode } from 'react';
import { Class, Exists } from '@gatsby-tv/utilities';

import { Spacing } from '@lib/types';

import styles from './TextBox.scss';

export interface TextBoxProps extends HTMLAttributes<Element> {
  children?: ReactNode;
  className?: string;
  gap?: Spacing;
  clamp?: number;
}

export const TextBox = forwardRef<HTMLDivElement, TextBoxProps>(
  (props: TextBoxProps, ref: Ref<HTMLDivElement>) => {
    const { children, className, gap = 'base', clamp, ...attributes } = props;

    const classes = Class(
      className,
      styles[`TextBox-spacing-${gap}`],
      clamp && styles.Clamp
    );

    return (
      <div
        ref={ref}
        style={Exists(clamp, { WebkitLineClamp: clamp })}
        className={classes}
        {...attributes}
      >
        {children}
      </div>
    );
  }
);

TextBox.displayName = 'TextBox';
