import React from "react";
import { Flex } from "@gatsby-tv/components";
import { useTheme } from "@gatsby-tv/utilities";

import { useFeaturedChannels } from "@src/utilities/use-featured-channels";

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
    .map((channel, index) => (
      <AvatarTooltip key={`${channel._id}.${index}`} channel={channel} />
    ));

  return <Flex {...flexProps}>{AvatarsMarkup}</Flex>;
}
