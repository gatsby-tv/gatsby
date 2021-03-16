import React from "react";
import { TextBox, Tabs, Rule } from "@gatsby-tv/components";
import { Channel } from "@gatsby-tv/types";
import { useTheme, useSelect, useUniqueId } from "@gatsby-tv/utilities";
import { useChannelContent } from "@gatsby-tv/next";

import { Listing } from "@src/components/Listing";

export interface ChannelContentProps {
  channel?: Channel;
  groups: number;
}

export function ChannelContent(props: ChannelContentProps): React.ReactElement {
  const theme = useTheme();
  const { channel, groups } = props;
  const { content } = useChannelContent(channel?._id);
  const [tab, setTab] = useSelect(["videos", "playlists", "shows"], "videos");
  const videosId = useUniqueId("tab");
  const playlistsId = useUniqueId("tab");
  const showsId = useUniqueId("tab");
  const panelId = useUniqueId("panel");

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

  const panelLabel = tab["videos"]
    ? videosId
    : tab["playlists"]
    ? playlistsId
    : showsId;

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
      <Tabs.Item id={videosId} option="videos" ariaControls={panelId}>
        Videos
      </Tabs.Item>
      <Tabs.Item id={playlistsId} option="playlists" ariaControls={panelId}>
        Playlists
      </Tabs.Item>
      <Tabs.Item id={showsId} option="shows" ariaControls={panelId}>
        Shows
      </Tabs.Item>
    </Tabs>
  );

  const ListingMarkup = !listing ? (
    <Listing.Skeleton format="nochannel" groups={groups} />
  ) : listing.length ? (
    <Listing
      id={panelId}
      format="nochannel"
      groups={groups}
      content={listing}
      ariaLabelledBy={panelLabel}
    />
  ) : (
    <TextBox id={panelId} expand font={theme.font[4]} align="center">
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
