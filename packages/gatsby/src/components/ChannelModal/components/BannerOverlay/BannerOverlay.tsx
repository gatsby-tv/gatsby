import React from "react";
import { css } from "styled-components";
import {
  Box,
  Avatar,
  Optional,
  Flex,
  Link,
  Icon,
  TextDisplay,
  TextMeta,
} from "@gatsby-tv/components";
import { Channel } from "@gatsby-tv/types";
import { CheckmarkFill } from "@gatsby-tv/icons";
import { FullValue, ChannelHandle, useTheme } from "@gatsby-tv/utilities";

import { InfoHeader } from "@src/components/InfoHeader";
import { Engagement } from "@src/components/Engagement";

export interface BannerOverlayProps {
  channel: Channel;
}

export function BannerOverlay(props: BannerOverlayProps): React.ReactElement {
  const { channel } = props;
  const theme = useTheme();

  const gradient = css`
    background-image: linear-gradient(
      to top,
      ${theme.colors.background[2].toString()},
      transparent 50%
    );
  `;

  const infoBoxProps = {
    absolute: true,
    bottom: theme.spacing[3],
    left: theme.spacing[3],
  };

  const infoProps = {
    channel,
    link: true,
    blurb: [ChannelHandle(channel.handle), FullValue(channel.subscribers, "subscriber")],
  };

  const engagementFlexProps = {
    absolute: true,
    bottom: theme.spacing[3],
    right: theme.spacing[3],
    gap: theme.spacing[1],
  };

  return (
    <Box css={gradient} absolute expand>
      <Box {...infoBoxProps}>
        <InfoHeader {...infoProps} />
      </Box>
      <Flex {...engagementFlexProps}>
        <Engagement type="subscribe" />
        <Engagement type="donate" />
        <Engagement type="misc" />
      </Flex>
    </Box>
  );
}
