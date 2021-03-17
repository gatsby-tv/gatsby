import React from "react";
import { Box, Flex, Rule, Tabs, TextDisplay } from "@gatsby-tv/components";
import {
  useTheme,
  useFrame,
  useSelect,
  useUniqueId,
} from "@gatsby-tv/utilities";
import { usePopularFeed, useNewFeed } from "@gatsby-tv/next";

import { PageBody } from "@src/components/PageBody";
import { Listing } from "@src/components/Listing";

export default function BrowsePage(): React.ReactElement {
  const theme = useTheme();
  const { screen } = useFrame();
  const [tab, setTab] = useSelect(["popular", "new"], "popular");
  const { content: recent, ...recentProps } = useNewFeed();
  const { content: popular, ...popularProps } = usePopularFeed();
  const listing = tab["popular"] ? popular : recent;
  const listingProps = tab["popular"] ? popularProps : recentProps;
  const popularId = useUniqueId("tab");
  const newId = useUniqueId("tab");
  const panelId = useUniqueId("panel");

  const panelLabel = tab["popular"] ? popularId : newId;
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
      <Tabs.Item id={popularId} option="popular" ariaControls={panelId}>
        Popular
      </Tabs.Item>
      <Tabs.Item id={newId} option="new" ariaControls={panelId}>
        New
      </Tabs.Item>
    </Tabs>
  );

  const ListingMarkup = listing ? (
    <Listing
      id={panelId}
      content={listing}
      groups={listingGroups}
      avatar={theme.avatar.base}
      ariaLabelledBy={panelLabel}
      {...listingProps}
    />
  ) : (
    <Listing.Skeleton groups={listingGroups} />
  );

  return (
    <PageBody>
      <Flex {...headerProps}>
        <TextDisplay size="large">Browse</TextDisplay>
        {TabsMarkup}
      </Flex>
      <Rule {...ruleProps} />
      {ListingMarkup}
    </PageBody>
  );
}
