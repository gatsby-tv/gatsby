import React from "react";
import { Avatar, Flex, Optional, TextPlaceholder } from "@gatsby-tv/components";
import { useTheme } from "@gatsby-tv/utilities";

export interface SkeletonProps {
  user?: boolean;
}

export function isSkeletonProps(props: any): props is SkeletonProps {
  return (props as SkeletonProps).user !== undefined;
}

export function Skeleton(props: SkeletonProps): React.ReactElement {
  const theme = useTheme();

  return (
    <Flex center gap={theme.spacing[1.5]}>
      <Flex.Item shrink={0}>
        <Avatar size={theme.avatar.largest} />
      </Flex.Item>
      <Flex column w={1} gap={theme.spacing[0.5]}>
        <TextPlaceholder heading w={0.8} font={theme.font[2]} />
        <TextPlaceholder w={0.4} font={theme.font[4]} />
      </Flex>
    </Flex>
  );
}
