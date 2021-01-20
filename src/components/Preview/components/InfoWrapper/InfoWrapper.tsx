import React from "react";
import { Flex, Avatar } from "@gatsby-tv/components";
import { IPFSContent } from "@gatsby-tv/types";
import { useTheme } from "@gatsby-tv/utilities";

import { Link } from "@src/components/Link";

export interface InfoWrapperProps {
  children?: React.ReactNode;
  avatar: IPFSContent;
  handle: string;
  size?: string;
}

export function InfoWrapper(props: InfoWrapperProps): React.ReactElement {
  const theme = useTheme();

  return (
    <Flex gap={theme.spacing.basetight}>
      <Flex.Item shrink={0} h="fit-content" zIndex={2}>
        <Link href={`/${props.handle}`}>
          <Avatar src={props.avatar} size={props.size ?? theme.avatar.base} />
        </Link>
      </Flex.Item>
      {props.children}
    </Flex>
  );
}