import React, { useEffect } from "react";
import Head from "next/head";
import {
  Box,
  Flex,
  Rule,
  TextDisplay,
  Icon,
  Slider,
} from "@gatsby-tv/components";
import { ExtendRight } from "@gatsby-tv/icons";
import {
  ifExists,
  useTheme,
  useFrame,
  useUniqueId,
} from "@gatsby-tv/utilities";
import {
  Link,
  usePopularFeed,
  useRecommendedFeed,
  useFeaturedChannels,
} from "@gatsby-tv/next";
import Preview from "@gatsby-tv/preview";

import { PageBody } from "@src/components/PageBody";
import { ChannelCarousel } from "@src/components/ChannelCarousel";
import { Info } from "@src/components/Info";
import { Listing } from "@src/components/Listing";

export default function IndexPage(): React.ReactElement {
  const theme = useTheme();
  const recommendedId = useUniqueId("section");
  const { screen } = useFrame();
  const { content: recommended, ...recommendedProps } = useRecommendedFeed();
  const { content: popular, ...popularProps } = usePopularFeed();
  const { channels } = useFeaturedChannels();

  const recommendedGroups = screen.width < 1200 ? 2 : 3;
  const popularGroups =
    screen.width < 900
      ? 2
      : screen.width < 1100
      ? 3
      : screen.width < 1400
      ? 4
      : 5;
  const carouselGroups =
    screen.width < 1100
      ? 4
      : screen.width < 1300
      ? 5
      : screen.width < 1600
      ? 6
      : 7;

  const ruleProps = {
    margin: [theme.spacing[1], theme.spacing[0], theme.spacing[2]],
  };

  const HeaderMarkup = (
    <Head>
      <title>Gatsby</title>
    </Head>
  );

  const CarouselMarkup = channels ? (
    <ChannelCarousel channels={channels} groups={carouselGroups} />
  ) : (
    <ChannelCarousel.Skeleton groups={carouselGroups} />
  );

  const PopularTitleMarkup = (
    <Box w="fit-content">
      <Link href={"/d/browse"} $props={{ underline: true }}>
        <Flex gap={theme.spacing[1]} align="center" paddingBottom="0.2rem">
          <TextDisplay>Popular</TextDisplay>
          <Icon src={ExtendRight} w={theme.icon.small} />
        </Flex>
      </Link>
    </Box>
  );

  const SliderMarkup = popular ? (
    <Slider groups={popularGroups} gap={theme.spacing[1]}>
      {popular.slice(0, 10).map((item, index) => (
        <Preview
          key={`${item._id}.${index}`}
          content={item}
          info={<Info content={item} channel avatar={theme.avatar.smaller} />}
          link={<Link href={`/v/${item._id}`} />}
        />
      ))}
    </Slider>
  ) : (
    <Flex w={1} gap={theme.spacing[1]}>
      {[...Array(popularGroups)].map((_, index) => (
        <Preview.Skeleton
          key={`skeleton.${index}`}
          info={<Info.Skeleton content channel avatar={theme.avatar.smaller} />}
        />
      ))}
    </Flex>
  );

  const ListingMarkup = recommended ? (
    <Listing
      content={recommended}
      groups={recommendedGroups}
      avatar={theme.avatar.base}
      ariaLabelledBy={recommendedId}
      {...recommendedProps}
    />
  ) : (
    <Listing.Skeleton groups={recommendedGroups} />
  );

  const PopularMarkup = (
    <Flex column gap={theme.spacing[1]}>
      {PopularTitleMarkup}
      {SliderMarkup}
    </Flex>
  );

  const RecommendedMarkup = (
    <Flex column gap={theme.spacing[1.5]}>
      <TextDisplay id={recommendedId}>Recommended</TextDisplay>
      {ListingMarkup}
    </Flex>
  );

  return (
    <>
      {HeaderMarkup}
      <PageBody>
        <Box margin={[theme.spacing[3], theme.spacing[0]]}>
          {CarouselMarkup}
        </Box>
        <Flex column gap={theme.spacing[1]}>
          {PopularMarkup}
          <Rule {...ruleProps} />
          {RecommendedMarkup}
        </Flex>
      </PageBody>
    </>
  );
}
