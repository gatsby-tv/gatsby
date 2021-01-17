import React from "react";
import { Avatar, Flex } from "@gatsby-tv/components";
import { IPFSContent } from "@gatsby-tv/types";
import { Negative, useTheme } from "@gatsby-tv/utilities";

import { cssCollation } from "@src/styles/collation";

export interface AvatarCollationProps {
  avatars: IPFSContent[];
  size?: string;
}

export function AvatarCollation(
  props: AvatarCollationProps
): React.ReactElement {
  const theme = useTheme();
  const { avatars } = props;
  avatars.reverse();

  return (
    <Flex css={cssCollation(theme.spacing.base)} reverse justify="flex-end">
      {avatars.map((avatar, index) => (
        <Avatar key={index} src={avatar} size={props.size} />
      ))}
    </Flex>
  );
}
