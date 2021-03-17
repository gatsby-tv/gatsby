import React from "react";
import { IPFSContent } from "@gatsby-tv/types";

import { Flex } from "@lib/components/Flex";
import { Avatar } from "@lib/components/Avatar";
import { cssCollation } from "@lib/styles/collation";

export interface AvatarCollationProps {
  avatars: (IPFSContent | string)[];
  size?: string;
}

export function AvatarCollation(
  props: AvatarCollationProps
): React.ReactElement {
  const { avatars } = props;
  avatars.reverse();

  const AvatarsMarkup = avatars.map((avatar, index) => (
    <Avatar
      key={`${JSON.stringify(avatar)}.${index}`}
      src={avatar}
      size={props.size}
    />
  ));

  return (
    <Flex css={cssCollation()} reverse justify="flex-end">
      {AvatarsMarkup}
    </Flex>
  );
}
