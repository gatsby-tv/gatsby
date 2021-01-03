import React from "react";
import { useTheme } from "@gatsby-tv/utilities";
import { Flex, Avatar } from "@gatsby-tv/components";

import { Channel } from "@src/types";
import { Link } from "@src/components/Link";

export interface MetaWrapperProps {
  children?: React.ReactNode;
  avatar: string;
  channel: Channel;
}

export function MetaWrapper(props: MetaWrapperProps): React.ReactElement {
  const theme = useTheme();

  return (
    <Flex $gap={theme.spacing.baseTight}>
      <Flex.Item $shrink={0} $height="fit-content" $zIndex={2}>
        <Link href={`/${props.channel.handle}`}>
          <Avatar src={props.avatar} $size="small" />
        </Link>
      </Flex.Item>
      {props.children}
    </Flex>
  );
}
