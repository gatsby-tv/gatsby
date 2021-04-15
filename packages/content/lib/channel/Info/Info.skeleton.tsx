import React from "react";
import { Avatar, TextPlaceholder } from "@gatsby-tv/components";

import styles from "./Info.scss";

export function Skeleton(): React.ReactElement {
  return (
    <div className={styles.Info}>
      <Avatar className={styles.Avatar} size="larger" />
      <div className={styles.TextArea}>
        <TextPlaceholder font="body-large" heading width={0.8} />
        <TextPlaceholder width={0.5} />
        <TextPlaceholder width={0.5} />
      </div>
    </div>
  );
}
