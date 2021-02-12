import React from "react";
import { Avatar, Flex } from "@gatsby-tv/components";
import { useTheme } from "@gatsby-tv/utilities";

export function SignedOut(): React.ReactElement {
  const theme = useTheme();

  const flexProps = {
    column: true,
    align: "center",
    distribute: "fill-evenly",
    gap: theme.spacing[1],
    padding: [theme.spacing[1], theme.spacing[0], theme.spacing[0]],
  };

  const AvatarsMarkup = [...Array(8)].map((_, index) => (
    <Avatar key={index} size={theme.avatar.small} />
  ));

  return <Flex {...flexProps}>{AvatarsMarkup}</Flex>;
}
