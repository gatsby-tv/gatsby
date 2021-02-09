import React from "react";
import { TextBox, Tabs, Rule } from "@gatsby-tv/components";
import { Channel } from "@gatsby-tv/types";
import { useTheme, useSelect } from "@gatsby-tv/utilities";

import { useChannelContent } from "@src/utilities/use-channel-content";
import { Listing } from "@src/components/Listing";

export interface ContentProps {
  channel: Channel;
}

export function Content(props: ContentProps): React.ReactElement {
  const theme = useTheme();
  const { channel } = props;
  const { content } = useChannelContent(channel._id);
  const [tab, setTab] = useSelect(["videos", "playlists", "shows"], "videos");

  const listing = tab["videos"]
    ? content?.videos
    : tab["playlists"]
    ? content?.playlists
    : content?.shows;

  const contentType = tab["videos"]
    ? "videos"
    : tab["playlists"]
    ? "playlists"
    : "shows";

  const tabsProps = {
    h: theme.spacing[3],
    font: theme.font[3],
    gap: theme.spacing[1.5],
    selection: tab,
    onSelect: setTab,
  };

  const ruleProps = {
    bg: theme.colors.background[5],
    margin: ["-2px", theme.spacing[0], theme.spacing[2]],
  };

  const TabsMarkup = (
    <Tabs {...tabsProps}>
      <Tabs.Item id="videos">Videos</Tabs.Item>
      <Tabs.Item id="playlists">Playlists</Tabs.Item>
      <Tabs.Item id="shows">Shows</Tabs.Item>
    </Tabs>
  );

  const ListingMarkup = !listing ? (
    <Listing.Skeleton format="nochannel" groups={2} />
  ) : listing.length ? (
    <Listing format="nochannel" groups={2} content={listing} />
  ) : (
    <TextBox expand font={theme.font[4]} align="center">
      {`This channel has not created any ${contentType}...`}
    </TextBox>
  );

  return (
    <>
      {TabsMarkup}
      <Rule {...ruleProps} />
      {ListingMarkup}
    </>
  );
}
