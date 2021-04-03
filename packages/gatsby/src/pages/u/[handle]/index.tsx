import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Flex, Rule, Image } from "@gatsby-tv/components";
import {
  UserHandle,
  FullValue,
  useTheme,
  useSelect,
  useUniqueId,
} from "@gatsby-tv/utilities";
import { useUser } from "@gatsby-tv/next";

import { InfoHeader } from "@src/components/InfoHeader";
import { Engagement } from "@src/components/Engagement";

export default function UserPage(): React.ReactElement {
  const theme = useTheme();
  const router = useRouter();
  const handle = [router.query.handle].flat()[0];
  const { user } = useUser(handle?.toLowerCase());

  const imageProps = {
    src: user?.banner,
    aspectRatio: 1 / 2,
    crop: [0.125, theme.spacing[0]],
  };

  const infoBoxProps = {
    absolute: true,
    bottom: theme.spacing[3],
    left: theme.spacing[5],
  };

  const infoFlexProps = {
    w: user ? "fit-content" : "50rem",
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
    <title>{user ? `${user.name} - Gatsby` : null}</title>
  );

  const InfoMarkup = user ? (
    <InfoHeader user={user} />
  ) : (
    <InfoHeader.Skeleton user />
  );

  const OverlayMarkup = (
    <>
      <Box {...infoBoxProps}>
        <Flex {...infoFlexProps}>{InfoMarkup}</Flex>
      </Box>
      <Flex {...engagementFlexProps}>
        <Engagement type="follow" shadow />
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
    </>
  );
}
