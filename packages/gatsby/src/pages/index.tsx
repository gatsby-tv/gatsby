import React from "react";
import Head from "next/head";
import { Box, Flex, Rule, TextDisplay } from "@gatsby-tv/components";
import { useTheme, useBreakpoints, useUniqueId } from "@gatsby-tv/utilities";

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
  const { content: recommended, ...recommendedProps } = useRecommendedFeed();
  const { content: popular, ...popularProps } = usePopularFeed();
  const { channels } = useFeaturedChannels();

  const recommendedGroups = useBreakpoints(
    {
      2: "(max-width: 1199px)",
      3: "(min-width: 1200px)",
    },
    3
  );

  const popularGroups = useBreakpoints(
    {
      3: "(max-width: 1099px)",
      4: "(min-width: 1100px) and (max-width: 1399px)",
      5: "(min-width: 1400px)",
    },
    5
  );

  const carouselGroups = useBreakpoints(
    {
      4: "(max-width: 1099px)",
      5: "(min-width: 1100px) and (max-width: 1299px)",
      6: "(min-width: 1300px) and (max-width: 1599px)",
      7: "(min-width: 1600px)",
    },
    6
  );

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
          <Flex column gap={theme.spacing[1.5]}>
            <TextDisplay id={recommendedId}>Recommended</TextDisplay>
            {ListingMarkup}
          </Flex>
        </Flex>
      </PageBody>
    </>
  );
}
