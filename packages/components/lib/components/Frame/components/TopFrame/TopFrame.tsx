import React, { forwardRef, Ref } from "react";
import { classNames, useForwardedRef } from "@gatsby-tv/utilities";

import styles from "../../Frame.scss";

export interface TopFrameProps {
  children?: React.ReactNode;
  topbar?: React.ReactElement;
  active?: boolean;
}

export const TopFrame = forwardRef<HTMLDivElement, TopFrameProps>(
  (props: TopFrameProps, ref: Ref<HTMLDivElement>) => {
    const { children, topbar: Topbar, active } = props;
    const frame = useForwardedRef<HTMLDivElement>(ref);

    const classes = classNames(styles.Bar, !active && styles.Hidden);
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

TopFrame.displayName = "TopFrame";
