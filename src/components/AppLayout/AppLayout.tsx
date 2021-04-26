import React from "react";
import { NextComponentType, NextPageContext } from "next";
import { Frame } from "@gatsby-tv/components";
import { Channel } from "@gatsby-tv/content";

import { PreAlpha } from "@src/components/PreAlpha";
import { Topbar } from "@src/components/Topbar";
import { Link } from "@src/components/Link";
import { useChannelModal } from "@src/utilities/channel-modal";

import styles from "./AppLayout.module.scss";

export interface AppLayoutProps<T> {
  page: NextComponentType<NextPageContext, any, T>;
  $props: T;
}

export function AppLayout<T>(props: AppLayoutProps<T>): React.ReactElement {
  const { page: Page, $props } = props;
  const [channel, setChannel] = useChannelModal();

  return (
    <Frame topbar={<Topbar className={styles.Topbar} />}>
      <PreAlpha />
      <Channel.Modal
        channel={channel}
        active={Boolean(channel)}
        link={Link.Channel}
        onExit={() => setChannel(undefined)}
      />
      <Page {...$props} />
    </Frame>
  );
}
