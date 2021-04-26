import React from "react";
import { Portal, TextMeta } from "@gatsby-tv/components";
import { classNames, useFrame } from "@gatsby-tv/utilities";

import styles from "./PreAlpha.module.scss";

export function PreAlpha(): React.ReactElement {
  const { fullscreen } = useFrame();
  const classes = classNames(styles.PreAlpha, fullscreen && styles.Fullscreen);

  return (
    <Portal id="pre-alpha">
      <TextMeta.Link
        className={classes}
        href="https://github.com/gatsby-tv/gatsby/issues"
        external
      >
        Pre-Alpha
      </TextMeta.Link>
    </Portal>
  );
}
