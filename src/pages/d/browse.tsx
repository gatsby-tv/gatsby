import React from "react";
import { Box, Flex, Rule, Tabs, TextDisplay } from "@gatsby-tv/components";
import { useTheme, useSelect } from "@gatsby-tv/utilities";
import { Topic } from "@gatsby-tv/types";

import { Listing } from "@src/components/Listing";
import { TopicListing } from "@src/components/TopicListing";
import { useNewFeed, usePopularFeed, useTopicFeed } from "@src/utilities/feeds";
import { usePageMargin } from "@src/utilities/use-page-margin";

export default function IndexPage(): React.ReactElement {
  const theme = useTheme();
  const margin = usePageMargin();
  const [tab, setTab] = useSelect(["topics", "popular", "new"], "topics");
  const newFeed = useNewFeed();
  const popularFeed = usePopularFeed();
  const topicFeed = useTopicFeed();

  const headerProps = {
    column: true,
    margin: [theme.spacing.baseloose, theme.spacing.none, theme.spacing.none],
    gap: theme.spacing.base,
  };

  const tabsProps = {
    h: "3rem",
    font: "large",
    gap: theme.spacing.base,
  };

  const ruleProps = {
    bg: theme.colors.background[4],
    margin: [
      "-2px",
      theme.spacing.none,
      tab["topics"] ? theme.spacing.base : theme.spacing.loose,
    ],
  };

  return (
    <Box margin={[theme.spacing.none, margin]}>
      <Flex {...headerProps}>
        <TextDisplay font="large">Browse</TextDisplay>
        <Tabs selection={tab} onSelect={setTab} {...tabsProps}>
          <Tabs.Item id="topics">Topics</Tabs.Item>
          <Tabs.Item id="popular">Popular</Tabs.Item>
          <Tabs.Item id="new">New</Tabs.Item>
        </Tabs>
      </Flex>
      <Rule {...ruleProps} />
      {tab["topics"] ? (
        <TopicListing generator={topicFeed} />
      ) : (
        <Listing grid generator={tab["popular"] ? popularFeed : newFeed} />
      )}
    </Box>
  );
}
