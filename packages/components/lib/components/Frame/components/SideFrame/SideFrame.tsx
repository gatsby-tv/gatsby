import { forwardRef, Ref, ReactNode, ReactElement } from 'react';
import { Class, useForwardedRef } from '@gatsby-tv/utilities';

import styles from '@lib/components/Frame/Frame.scss';

export interface SideFrameProps {
  children?: ReactNode;
  content?: ReactElement;
  active?: boolean;
}

export const SideFrame = forwardRef<HTMLDivElement, SideFrameProps>(
  (props: SideFrameProps, ref: Ref<HTMLDivElement>) => {
    const { children, content: Sidebar, active } = props;
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
        <nav ref={frame} style={hidden} className={classes}>
          {Sidebar}
        </nav>
        {children}
      </div>
    ) : (
      <>{children}</>
    );
  }
);

SideFrame.displayName = 'SideFrame';
