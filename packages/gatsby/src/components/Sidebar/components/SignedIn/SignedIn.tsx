import React from "react";
import { Flex } from "@gatsby-tv/components";
import { User, Channel } from "@gatsby-tv/types";
import { useTheme } from "@gatsby-tv/utilities";
import { useUserFeeds } from "@gatsby-tv/next";

import { AvatarTooltip } from "../AvatarTooltip";

export interface SignedInProps {
  user: User;
}

export function SignedIn(props: SignedInProps): React.ReactElement {
  const theme = useTheme();
  const { user } = props;
  const { feeds } = useUserFeeds(user._id);

  const flexProps = {
    column: true,
    align: "center",
    distribute: "fill-evenly",
    gap: theme.spacing[1],
    padding: [theme.spacing[1], theme.spacing[0], theme.spacing[0]],
  };

  const AvatarsMarkup = feeds?.subscriptions
    .slice(0, 8)
    .map((channel: Channel, index: number) => (
      <AvatarTooltip key={`${channel._id}.${index}`} channel={channel} />
    ));

  return <Flex {...flexProps}>{AvatarsMarkup}</Flex>;
}
