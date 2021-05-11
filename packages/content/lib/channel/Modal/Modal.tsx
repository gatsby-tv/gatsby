import React, { useState, useEffect, useCallback } from "react";
import {
  Avatar,
  Button,
  Scroll,
  Image,
  Modal as ModalComponent,
  Panel as PanelComponent,
  Optional,
  Rule,
  Tabs,
  TextDisplay,
  TextMeta,
} from "@gatsby-tv/components";
import { Cancel } from "@gatsby-tv/icons";
import {
  ifExists,
  ChannelHandle,
  FullValue,
  useFrame,
  useMobileDetector,
} from "@gatsby-tv/utilities";
import { Channel } from "@gatsby-tv/types";

import { Videos } from "@lib/channel/Videos";
import { Playlists } from "@lib/channel/Playlists";
import { Shows } from "@lib/channel/Shows";
import { LinkProps } from "@lib/types";

import { Skeleton } from "./Modal.skeleton";
import styles from "./Modal.scss";

export interface ModalProps {
  channel?: Channel;
  active?: boolean;
  link?: React.FC<LinkProps>;
  onExit?: () => void;
}

export function Modal(props: ModalProps): React.ReactElement | null {
  const { channel, active, link: Link, onExit } = props;
  const isMobile = useMobileDetector();
  const { screen } = useFrame();
  const [mounted, setMounted] = useState(false);
  const [scrolling, setScrolling] = useState<number | undefined>();
  const [tab, setTab] = useState("videos");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!active) {
      setTab("videos");
    }
  }, [active]);

  const onScroll = useCallback(
    (event: any) => {
      if (scrolling !== undefined) {
        clearTimeout(scrolling);
      }
      const id = setTimeout(setScrolling, 150);
      setScrolling(id);
    },
    [scrolling]
  );

  if (!mounted || !channel)
    return (
      <Skeleton
        mobile={Boolean(isMobile)}
        tab={tab}
        setTab={setTab}
        active={active}
        onExit={onExit}
        onScroll={onScroll}
      />
    );

  const Container = isMobile ? PanelComponent : ModalComponent;
  const Listing = tab === "videos" ? Videos : tab === "playlists" ? Playlists : Shows;

  const OverlayMarkup = (
    <div className={styles.Overlay}>
      <div className={styles.Header}>
        <Avatar
          className={styles.Avatar}
          src={channel.avatar}
          size={
            screen.width > 650
              ? "largest"
              : screen.width > 400
              ? "larger"
              : "base"
          }
        />
        <div className={styles.HeaderTextArea}>
          <Optional
            component={Link}
            active={Boolean(Link)}
            $props={{ channel }}
          >
            <TextDisplay.Link
              className={styles.HeaderTitle}
              size={screen.width > 650 ? "medium" : "small"}
            >
              {channel.name}
            </TextDisplay.Link>
          </Optional>
          <TextMeta.List className={styles.HeaderInfo}>
            <TextMeta>{ChannelHandle(channel.handle)}</TextMeta>
            <TextMeta>{FullValue(channel.subscribers, "subscriber")}</TextMeta>
          </TextMeta.List>
        </div>
      </div>
    </div>
  );

  return (
    <Container
      id="channel"
      className={isMobile ? styles.Panel : styles.Modal}
      overlay
      draggable={ifExists(isMobile, !scrolling)}
      active={active}
      onExit={onExit}
    >
      <Button
        className={styles.Cancel}
        animate
        icon={Cancel}
        size="smaller"
        onClick={onExit}
      />
      <Scroll smooth hide onScroll={onScroll}>
        <Image src={channel.banner} aspectRatio={0.5} overlay={OverlayMarkup} />
        <div className={styles.Content}>
          <Tabs
            className={styles.Tabs}
            gap="loose"
            selection={tab}
            onSelect={setTab}
          >
            <Tabs.Item option="videos">Videos</Tabs.Item>
            <Tabs.Item option="playlists">Playlists</Tabs.Item>
            <Tabs.Item option="shows">Shows</Tabs.Item>
          </Tabs>
          <Rule className={styles.Rule} spacing="none" />
          <Listing channel={channel} link={Link} />
        </div>
      </Scroll>
    </Container>
  );
}
