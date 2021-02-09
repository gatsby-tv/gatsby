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

  const infoFlexProps = {
    absolute: true,
    bottom: theme.spacing[3],
    left: theme.spacing[3],
    gap: theme.spacing[1.5],
  };

  const verifiedOptionalProps = {
    active: channel.verified,
    $props: { gap: theme.spacing[1] },
  };

  const engagementFlexProps = {
    absolute: true,
    bottom: theme.spacing[3],
    right: theme.spacing[3],
    gap: theme.spacing[1],
  };

  const AvatarMarkup = (
    <Flex.Item shrink={0}>
      <Avatar src={channel.avatar} size={theme.avatar.largest} />
    </Flex.Item>
  );

  const VerifiedMarkup = channel.verified ? (
    <Icon src={CheckmarkFill} w={theme.icon.smaller} />
  ) : null;

  const NameMarkup = (
    <Optional component={Flex} {...verifiedOptionalProps}>
      <Box w="fit-content">
        <Link underline href={`/${channel.handle}`}>
          <TextDisplay>{channel.name}</TextDisplay>
        </Link>
      </Box>
      {VerifiedMarkup}
    </Optional>
  );

  const InfoMarkup = (
    <TextMeta.List bold font={theme.font[4]}>
      <TextMeta>{ChannelHandle(channel.handle)}</TextMeta>
      <TextMeta>{FullValue(channel.subscribers, "subscriber")}</TextMeta>
    </TextMeta.List>
  );

  return (
    <Box css={gradient} absolute expand>
      <Flex {...infoFlexProps}>
        {AvatarMarkup}
        <Flex column>
          {NameMarkup}
          {InfoMarkup}
        </Flex>
      </Flex>
      <Flex {...engagementFlexProps}>
        <Engagement type="subscribe" />
        <Engagement type="donate" />
        <Engagement type="misc" />
      </Flex>
    </Box>
  );
}
