import React from "react";
import { IPFSContent } from "@gatsby-tv/types";

import { DiscreteSize } from "@lib/types";
import { Avatar } from "@lib/components/Avatar";

import styles from "./AvatarCollation.scss";

export interface AvatarCollationProps {
  avatars: (IPFSContent | string)[];
  size?: DiscreteSize;
}

export function AvatarCollation(
  props: AvatarCollationProps
): React.ReactElement {
  const { avatars, size } = props;
  avatars.reverse();

  const AvatarsMarkup = avatars.map((avatar, index) => (
    <Avatar
      key={`${JSON.stringify(avatar)}.${index}`}
      src={avatar}
      size={size}
    />
  ));

  return (
    <div className={styles.AvatarCollation}>
      {AvatarsMarkup}
    </div>
  );
}
