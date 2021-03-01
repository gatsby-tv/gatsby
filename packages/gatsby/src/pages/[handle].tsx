import React from "react";
import { useRouter } from "next/router";
import { Box, Flex, Rule, Image } from "@gatsby-tv/components";
import {
  ChannelHandle,
  FullValue,
  useTheme,
  useSelect,
  useUniqueId,
} from "@gatsby-tv/utilities";

import { InfoHeader, InfoHeaderProps } from "@src/components/InfoHeader";
import { ChannelContent } from "@src/components/ChannelContent";
import { useChannel } from "@src/utilities/use-channel";
import { useChannelContent } from "@src/utilities/use-channel-content";

export default function ChannelPage(): React.ReactElement {
  const theme = useTheme();
  const router = useRouter();
  const handle = [router.query.handle].flat()[0];
  const { channel } = useChannel(handle?.toLowerCase());

  const imageProps = {
    src: channel?.banner,
    aspectRatio: 1 / 2,
    crop: [0.125, theme.spacing[0]],
  };

  const overlayBoxProps = {
    absolute: true,
    bottom: theme.spacing[5],
    left: theme.spacing[5],
  };

  const overlayFlexProps = {
    w: channel ? "fit-content" : "50rem",
    bg: theme.colors.background[4],
    padding: theme.spacing[1.5],
    shadow: true,
  };

  const headerProps = channel
    ? {
        channel,
        blurb: [
          ChannelHandle(channel.handle),
          FullValue(channel.subscribers, "subscriber"),
        ],
      }
    : {};

  const HeaderMarkup = channel ? (
    <InfoHeader {...(headerProps as InfoHeaderProps)} />
  ) : (
    <InfoHeader.Skeleton channel />
  );

  const OverlayMarkup = (
    <Box {...overlayBoxProps}>
      <Flex {...overlayFlexProps}>{HeaderMarkup}</Flex>
    </Box>
  );

  const BannerMarkup = <Image overlay={OverlayMarkup} {...imageProps} />;

  return (
    <>
      {BannerMarkup}
      <Box margin={[theme.spacing[3], theme.spacing[5]]}>
        <ChannelContent channel={channel} groups={4} />
      </Box>
    </>
  );
}
