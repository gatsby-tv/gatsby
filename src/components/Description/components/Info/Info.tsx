import React from "react";
import { Flex, TextMeta, Icon } from "@gatsby-tv/components";
import { Video } from "@gatsby-tv/types";
import { Transfer } from "@gatsby-tv/icons";
import {
  FullValue,
  FullReleaseDate,
  useTheme,
  useIPFSPeers,
} from "@gatsby-tv/utilities";

export interface InfoProps {
  video: Video;
}

export function Info(props: InfoProps): React.ReactElement {
  const { title, views, releaseDate } = props.video;
  const { peers } = useIPFSPeers();
  const theme = useTheme();

  const PeersMarkup = (
    <Flex gap={theme.spacing[0.5]}>
      <Icon src={Transfer} w={theme.icon.small} />
      {FullValue(peers.length, "peer")}
    </Flex>
  );

  return (
    <Flex column w={1} gap={theme.spacing[1]}>
      <TextMeta bold heading font={theme.font[3]}>
        {title}
      </TextMeta>
      <TextMeta.List font={theme.font[4]} subdued>
        <TextMeta>{FullValue(views, "view")}</TextMeta>
        <TextMeta>{FullReleaseDate(releaseDate)}</TextMeta>
        <TextMeta>{PeersMarkup}</TextMeta>
      </TextMeta.List>
    </Flex>
  );
}
