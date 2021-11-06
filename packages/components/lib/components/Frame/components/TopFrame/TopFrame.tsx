import { forwardRef, Ref, ReactNode, ReactElement } from 'react';
import { Class, useStyles, useForwardedRef } from '@gatsby-tv/utilities';

export interface TopFrameProps {
  children?: ReactNode;
  content?: ReactElement;
  active?: boolean;
}

export const TopFrame = forwardRef<HTMLDivElement, TopFrameProps>(
  (props: TopFrameProps, ref: Ref<HTMLDivElement>) => {
    const { children, content: Topbar, active } = props;
    const styles = useStyles();
    const frame = useForwardedRef<HTMLDivElement>(ref);

    const classes = Class(styles.Bar, !active && styles.Hidden);
    const hidden =
      frame.current && !active
        ? {
            transform: `translateY(-${
              frame.current.getBoundingClientRect().height
            }px)`,
          }
        : undefined;

    return Topbar ? (
      <div className={styles.TopFrame}>
        <nav ref={frame} style={hidden} className={classes}>
          {Topbar}
        </nav>
        {children}
      </div>
    ) : (
      <>{children}</>
    );
  }
);

TopFrame.displayName = 'TopFrame';
