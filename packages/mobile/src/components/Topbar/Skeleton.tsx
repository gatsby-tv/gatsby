import React from "react";
import { Flex, Avatar } from "@gatsby-tv/components";
import { useTheme } from "@gatsby-tv/utilities";

export function Skeleton(): React.ReactElement {
  const theme = useTheme();

  return (
    <Flex.Item>
      <Avatar size={theme.avatar.smaller} />
    </Flex.Item>
  );
}
