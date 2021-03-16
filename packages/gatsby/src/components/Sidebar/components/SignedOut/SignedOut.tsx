import React from "react";
import { Flex } from "@gatsby-tv/components";
import { Channel } from "@gatsby-tv/types";
import { useTheme } from "@gatsby-tv/utilities";
import { useFeaturedChannels } from "@gatsby-tv/next";

import { AvatarTooltip } from "../AvatarTooltip";

export function SignedOut(): React.ReactElement {
  const theme = useTheme();
  const { channels } = useFeaturedChannels();

  const flexProps = {
    column: true,
    align: "center",
    distribute: "fill-evenly",
    gap: theme.spacing[1],
    padding: [theme.spacing[1], theme.spacing[0], theme.spacing[0]],
  };

  const AvatarsMarkup = channels
    ?.slice(0, 8)
    .map((channel: Channel, index: number) => (
      <AvatarTooltip key={`${channel._id}.${index}`} channel={channel} />
    ));

  return <Flex {...flexProps}>{AvatarsMarkup}</Flex>;
}
