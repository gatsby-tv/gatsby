import React, { useEffect } from "react";
import Head from "next/head";
import { Box, Flex, Rule, TextDisplay } from "@gatsby-tv/components";
import {
  ifExists,
  useTheme,
  useFrame,
  useUniqueId,
} from "@gatsby-tv/utilities";

import { PageBody } from "@src/components/PageBody";
import { ChannelCarousel } from "@src/components/ChannelCarousel";
import { PreviewSlider } from "@src/components/PreviewSlider";
import { Listing } from "@src/components/Listing";
import { usePopularFeed } from "@src/utilities/use-popular-feed";
import { useRecommendedFeed } from "@src/utilities/use-recommended-feed";
import { useFeaturedChannels } from "@src/utilities/use-featured-channels";

export default function IndexPage(): React.ReactElement {
  const theme = useTheme();
  const recommendedId = useUniqueId("section-label");
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

  const SliderMarkup = popular ? (
    <PreviewSlider
      href="/d/browse"
      title="Popular"
      content={popular.slice(0, 10)}
      groups={popularGroups}
      {...popularProps}
    />
  ) : (
    <PreviewSlider.Skeleton
      href="/d/browse"
      title="Popular"
      groups={popularGroups}
    />
  );

  const ListingMarkup = recommended ? (
    <Listing
      content={recommended}
      groups={recommendedGroups}
      ariaLabelledBy={recommendedId}
      {...recommendedProps}
    />
  ) : (
    <Listing.Skeleton groups={recommendedGroups} />
  );

  const RecommendedMarkup = (
    <Flex column gap={theme.spacing[1.5]}>
      <TextDisplay
        id={recommendedId}
        marginLeft={ifExists(screen.width < 450, theme.spacing[3])}
      >
        Recommended
      </TextDisplay>
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
          {SliderMarkup}
          <Rule {...ruleProps} />
          {RecommendedMarkup}
        </Flex>
      </PageBody>
    </>
  );
}
