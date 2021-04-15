import React, { useState, useCallback } from "react";
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
  TextPlaceholder,
  TextMeta,
} from "@gatsby-tv/components";
import { Cancel } from "@gatsby-tv/icons";
import {
  ifExists,
  ChannelHandle,
  FullValue,
  useSelect,
  useMobileDetector,
} from "@gatsby-tv/utilities";
import { Channel } from "@gatsby-tv/types";

import { Videos } from "@lib/channel/Videos";
import { Playlists } from "@lib/channel/Playlists";
import { Shows } from "@lib/channel/Shows";
import { LinkProps } from "@lib/types";

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
  const [scrolling, setScrolling] = useState<number | undefined>();
  const [tab, setTab] = useSelect(["videos", "playlists", "shows"], "videos");

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

  if (isMobile === undefined) return null;

  const Container = isMobile ? PanelComponent : ModalComponent;
  const Listing = tab["videos"] ? Videos : tab["playlists"] ? Playlists : Shows;

  const OverlayInfo = channel ? (
    <>
      <Optional component={Link} active={Boolean(Link)} $props={{ channel }}>
        <TextDisplay.Link>{channel.name}</TextDisplay.Link>
      </Optional>
      <TextMeta.List className={styles.HeaderInfo}>
        <TextMeta>{ChannelHandle(channel.handle)}</TextMeta>
        <TextMeta>{FullValue(channel.subscribers, "subscriber")}</TextMeta>
      </TextMeta.List>
    </>
  ) : (
    <>
      <TextPlaceholder font="display-medium" heading width={0.3} />
      <TextPlaceholder font="display-small" width={0.15} />
    </>
  );

  const OverlayMarkup = (
    <div className={styles.Overlay}>
      <div className={styles.Header}>
        <Avatar src={channel?.avatar} size="largest" />
        <div className={styles.HeaderTextArea}>{OverlayInfo}</div>
      </div>
    </div>
  );

  return (
    <Container
      id="channel"
      className={isMobile ? styles.Panle : styles.Modal}
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
        <Image
          src={channel?.banner}
          aspectRatio={0.5}
          overlay={OverlayMarkup}
        />
        <div className={styles.Container}>
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
