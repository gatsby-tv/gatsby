import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Flex, Rule, Image } from "@gatsby-tv/components";
import {
  ChannelHandle,
  FullValue,
  useTheme,
  useSelect,
  useUniqueId,
} from "@gatsby-tv/utilities";
import { useChannel } from "@gatsby-tv/next";

import { PageBody } from "@src/components/PageBody";
import { InfoHeader } from "@src/components/InfoHeader";
import { Engagement } from "@src/components/Engagement";
import { ChannelContent } from "@src/components/ChannelContent";

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

  const infoBoxProps = {
    absolute: true,
    bottom: theme.spacing[3],
    left: theme.spacing[5],
  };

  const infoFlexProps = {
    w: channel ? "fit-content" : "50rem",
    bg: theme.colors.background[4],
    padding: theme.spacing[1.5],
    shadow: true,
  };

  const engagementFlexProps = {
    absolute: true,
    bottom: theme.spacing[3],
    right: theme.spacing[5],
    gap: theme.spacing[1],
  };

  const HeaderMarkup = (
    <Head>
      <title>{channel ? `${channel.name} - Gatsby` : null}</title>
    </Head>
  );

  const InfoMarkup = channel ? (
    <InfoHeader channel={channel} />
  ) : (
    <InfoHeader.Skeleton channel />
  );

  const OverlayMarkup = (
    <>
      <Box {...infoBoxProps}>
        <Flex {...infoFlexProps}>{InfoMarkup}</Flex>
      </Box>
      <Flex {...engagementFlexProps}>
        <Engagement type="subscribe" shadow />
        <Engagement type="donate" shadow />
        <Engagement type="misc" shadow />
      </Flex>
    </>
  );

  const BannerMarkup = <Image overlay={OverlayMarkup} {...imageProps} />;

  return (
    <>
      {HeaderMarkup}
      {BannerMarkup}
      <PageBody>
        <ChannelContent channel={channel} groups={4} />
      </PageBody>
    </>
  );
}
