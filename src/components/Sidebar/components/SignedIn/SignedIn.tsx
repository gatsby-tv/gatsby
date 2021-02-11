import React from "react";
import { Avatar, Flex } from "@gatsby-tv/components";
import { Channel } from "@gatsby-tv/types";
import { useTheme } from "@gatsby-tv/utilities";

export interface SignedInProps {
  subscriptions: Channel[];
}

export function SignedIn(props: SignedInProps): React.ReactElement {
  const theme = useTheme();
  const { subscriptions } = props;

  const flexProps = {
    column: true,
    align: "center",
    distribute: "fill-evenly",
    gap: theme.spacing[1],
    padding: [theme.spacing[1], theme.spacing[0], theme.spacing[0]],
  };

  const AvatarsMarkup = subscriptions
    .slice(0, 8)
    .map((channel, index) => (
      <Avatar
        key={`${channel._id}.${index}`}
        src={channel.avatar}
        size={theme.avatar.small}
      />
    ));

  return <Flex {...flexProps}>{AvatarsMarkup}</Flex>;
}
