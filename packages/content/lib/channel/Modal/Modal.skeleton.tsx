import { useState, useEffect, useCallback, ReactElement } from 'react';
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
  TextPlaceholder,
} from '@gatsby-tv/components';
import { Cancel } from '@gatsby-tv/icons';

import { Videos } from '@lib/channel/Videos';
import { Playlists } from '@lib/channel/Playlists';
import { Shows } from '@lib/channel/Shows';

import styles from './Modal.scss';

export interface SkeletonProps {
  mobile: boolean;
  tab: string;
  setTab: (id: string) => void;
  active?: boolean;
  onExit?: () => void;
  onScroll: (event: any) => void;
}

export function Skeleton(props: SkeletonProps): ReactElement | null {
  const { mobile, tab, setTab, active, onExit, onScroll } = props;

  const Container = mobile ? PanelComponent : ModalComponent;
  const Listing =
    tab === 'videos' ? Videos : tab === 'playlists' ? Playlists : Shows;

  const OverlayMarkup = (
    <div className={styles.Overlay}>
      <div className={styles.Header}>
        <Avatar size="largest" />
        <div className={styles.HeaderTextArea}>
          <TextPlaceholder font="display-medium" heading width={0.3} />
          <TextPlaceholder font="display-small" width={0.15} />
        </div>
      </div>
    </div>
  );

  return (
    <Container
      className={mobile ? styles.Panel : styles.Modal}
      overlay
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
        <Image aspectRatio="2 / 1" overlay={OverlayMarkup} />
        <div>
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
          <Listing />
        </div>
      </Scroll>
    </Container>
  );
}
