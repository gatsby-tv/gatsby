import React from "react";
import { Box, Flex, Rule, Tabs, TextDisplay } from "@gatsby-tv/components";
import { useTheme, useSelect, useBreakpoints } from "@gatsby-tv/utilities";

import { Listing } from "@src/components/Listing";
import { TopicListing } from "@src/components/TopicListing";
import { usePopularFeed } from "@src/utilities/use-popular-feed";
import { useNewFeed } from "@src/utilities/use-new-feed";
import { useTopicsFeed } from "@src/utilities/use-topics-feed";

export default function BrowsePage(): React.ReactElement {
  const theme = useTheme();
  const [tab, setTab] = useSelect(["topics", "popular", "new"], "topics");
  const { content: recent, ...recentProps } = useNewFeed();
  const { content: popular, ...popularProps } = usePopularFeed();
  const { topics, ...topicsProps } = useTopicsFeed();
  const listing = tab["popular"] ? popular : recent;
  const listingProps = tab["popular"] ? popularProps : recentProps;

  const topicGroups =
    (useBreakpoints({
      3: "(max-width: 1100px)",
      4: "(min-width: 1101px) and (max-width: 1400px)",
      5: "(min-width: 1400px)",
    }) as number) ?? 5;

  const listingGroups =
    (useBreakpoints({
      2: "(max-width: 1200px)",
      3: "(min-width: 1201px)",
    }) as number) ?? 3;

  const headerProps = {
    column: true,
    gap: theme.spacing[1.5],
  };

  const tabsProps = {
    h: theme.spacing[3],
    font: theme.font[3],
    gap: theme.spacing[1.5],
  };

  const ruleProps = {
    bg: theme.colors.background[4],
    margin: ["-2px", theme.spacing[0], theme.spacing[3]],
  };

  const TabsMarkup = (
    <Tabs selection={tab} onSelect={setTab} {...tabsProps}>
      <Tabs.Item id="topics">Topics</Tabs.Item>
      <Tabs.Item id="popular">Popular</Tabs.Item>
      <Tabs.Item id="new">New</Tabs.Item>
    </Tabs>
  );

  const TopicListingMarkup = topics ? (
    <TopicListing topics={topics} groups={topicGroups} {...topicsProps} />
  ) : (
    <TopicListing.Skeleton groups={topicGroups} />
  );

  const ListingMarkup = listing ? (
    <Listing content={listing} groups={listingGroups} {...listingProps} />
  ) : (
    <Listing.Skeleton groups={listingGroups} />
  );

  const ContentMarkup = tab["topics"] ? TopicListingMarkup : ListingMarkup;

  return (
    <Box margin={theme.spacing[3]}>
      <Box maxw="200rem" margin={[theme.spacing[0], "auto"]}>
        <Flex {...headerProps}>
          <TextDisplay size="large">Browse</TextDisplay>
          {TabsMarkup}
        </Flex>
        <Rule {...ruleProps} />
        {ContentMarkup}
      </Box>
    </Box>
  );
}
