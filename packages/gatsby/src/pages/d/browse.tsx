import React from "react";
import { Box, Flex, Rule, Tabs, TextDisplay } from "@gatsby-tv/components";
import {
  useTheme,
  useFrame,
  useSelect,
  useUniqueId,
} from "@gatsby-tv/utilities";
import { usePopularFeed, useNewFeed, useTopicsFeed } from "@gatsby-tv/next";

import { PageBody } from "@src/components/PageBody";
import { Listing } from "@src/components/Listing";
import { TopicListing } from "@src/components/TopicListing";

export default function BrowsePage(): React.ReactElement {
  const theme = useTheme();
  const { screen } = useFrame();
  const [tab, setTab] = useSelect(["topics", "popular", "new"], "topics");
  const { content: recent, ...recentProps } = useNewFeed();
  const { content: popular, ...popularProps } = usePopularFeed();
  const { topics, ...topicsProps } = useTopicsFeed();
  const listing = tab["popular"] ? popular : recent;
  const listingProps = tab["popular"] ? popularProps : recentProps;
  const topicsId = useUniqueId("tab");
  const popularId = useUniqueId("tab");
  const newId = useUniqueId("tab");
  const panelId = useUniqueId("panel");

  const panelLabel = tab["topics"]
    ? topicsId
    : tab["popular"]
    ? popularId
    : newId;

  const topicGroups = screen.width < 1100 ? 3 : screen.width < 1400 ? 4 : 5;
  const listingGroups = screen.width < 1200 ? 2 : 3;

  const headerProps = {
    column: true,
    gap: theme.spacing[2],
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
      <Tabs.Item id={topicsId} option="topics" ariaControls={panelId}>
        Topics
      </Tabs.Item>
      <Tabs.Item id={popularId} option="popular" ariaControls={panelId}>
        Popular
      </Tabs.Item>
      <Tabs.Item id={newId} option="new" ariaControls={panelId}>
        New
      </Tabs.Item>
    </Tabs>
  );

  const TopicListingMarkup = topics ? (
    <TopicListing
      id={panelId}
      topics={topics}
      groups={topicGroups}
      ariaLabelledBy={panelLabel}
      {...topicsProps}
    />
  ) : (
    <TopicListing.Skeleton groups={topicGroups} />
  );

  const ListingMarkup = listing ? (
    <Listing
      id={panelId}
      content={listing}
      groups={listingGroups}
      ariaLabelledBy={panelLabel}
      {...listingProps}
    />
  ) : (
    <Listing.Skeleton groups={listingGroups} />
  );

  const ContentMarkup = tab["topics"] ? TopicListingMarkup : ListingMarkup;

  return (
    <PageBody>
      <Flex {...headerProps}>
        <TextDisplay size="large">Browse</TextDisplay>
        {TabsMarkup}
      </Flex>
      <Rule {...ruleProps} />
      {ContentMarkup}
    </PageBody>
  );
}
