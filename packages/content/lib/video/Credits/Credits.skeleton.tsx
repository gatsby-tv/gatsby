import React from "react";
import { Rule, TextPlaceholder } from "@gatsby-tv/components";

import { Channel } from "@lib/channel";
import { User } from "@lib/user";

import styles from "./Credits.scss";

export function Skeleton(): React.ReactElement {
  return (
    <div className={styles.Credits}>
      <TextPlaceholder width={0.4} />
      <Channel.Info />
      <Rule className={styles.Rule} />
      <User.Info />
    </div>
  );
}
