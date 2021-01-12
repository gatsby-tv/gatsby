import React from "react";
import { Flex, TextMeta, Icon } from "@gatsby-tv/components";
import { Transfer } from "@gatsby-tv/icons";
import {
  FullValue,
  FullReleaseDate,
  Value,
  useTheme,
  useIPFSPeers,
} from "@gatsby-tv/utilities";

export interface InfoProps {
  title: string;
  views: number;
  releaseDate: Date;
}

export function Info(props: InfoProps) {
  const theme = useTheme();
  const { peers } = useIPFSPeers();

  return (
    <Flex column w={1} gap={theme.spacing.tight}>
      <TextMeta bold font="large">
        {props.title}
      </TextMeta>
      <Flex justify="space-between">
        <TextMeta.List subdued>
          <TextMeta>{FullValue(props.views, "view")}</TextMeta>
          <TextMeta>{FullReleaseDate(props.releaseDate)}</TextMeta>
        </TextMeta.List>
        <TextMeta subdued>
          <Flex gap={theme.spacing.extraTight}>
            <Icon src={Transfer} w={theme.icon.small} />
            {Value(peers.length, "peer")}
          </Flex>
        </TextMeta>
      </Flex>
    </Flex>
  );
}
