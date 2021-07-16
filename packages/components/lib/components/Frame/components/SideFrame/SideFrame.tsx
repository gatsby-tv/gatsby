import React, { forwardRef, Ref } from 'react';
import { Class, useForwardedRef } from '@gatsby-tv/utilities';

import styles from '../../Frame.scss';

export interface SideFrameProps {
  children?: React.ReactNode;
  sidebar?: React.ReactElement;
  active?: boolean;
}

export const SideFrame = forwardRef<HTMLDivElement, SideFrameProps>(
  (props: SideFrameProps, ref: Ref<HTMLDivElement>) => {
    const { children, sidebar: Sidebar, active } = props;
    const frame = useForwardedRef<HTMLDivElement>(ref);

    const classes = Class(styles.Bar, !active && styles.Hidden);
    const hidden =
      frame.current && !active
        ? {
            transform: `translateX(-${
              frame.current.getBoundingClientRect().width
            }px)`,
          }
        : undefined;

    return Sidebar ? (
      <div className={styles.SideFrame}>
        <div ref={frame} style={hidden} className={classes}>
          {Sidebar}
        </div>
        {children}
      </div>
    ) : (
      <>{children}</>
    );
  }
);

SideFrame.displayName = 'SideFrame';
