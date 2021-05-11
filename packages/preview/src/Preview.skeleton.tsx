import React, { ReactNode } from "react";
import { Optional, Image } from "@gatsby-tv/components";
import { classNames } from "@gatsby-tv/utilities";

import { PreviewFormat } from "@src/types";
import styles from "@src/Preview.scss";

export interface SkeletonProps {
  format?: PreviewFormat;
  info?: ReactNode;
}

export function Skeleton(props: SkeletonProps): React.ReactElement {
  const { format = "column", info: Info } = props;

  const classes = classNames(styles.Skeleton, styles[`Preview-${format}`]);

  const InfoMarkup = Info ? (
    <Optional
      component="div"
      active={format !== "column"}
      $props={{ className: styles[`Item-${format}`] }}
    >
      {Info}
    </Optional>
  ) : null;

  return (
    <div className={classes}>
      <Image
        className={styles.Skeleton}
        rounded="smallest"
        aspectRatio={0.5625}
      />
      {InfoMarkup}
    </div>
  );
}
