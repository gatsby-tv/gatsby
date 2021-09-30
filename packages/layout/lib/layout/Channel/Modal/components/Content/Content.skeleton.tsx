import { ReactElement, Dispatch, SetStateAction } from 'react';
import { Avatar, Image, Rule, Scroll, Tabs, TextPlaceholder } from '@gatsby-tv/components';

import { Videos } from '@lib/layout/Channel/Videos';
import { Playlists } from '@lib/layout/Channel/Playlists';
import { Shows } from '@lib/layout/Channel/Shows';

import styles from './Content.scss';

export interface SkeletonProps {
  tab: string;
  setTab: Dispatch<SetStateAction<string>>;
}

export function Skeleton(props: SkeletonProps): ReactElement {
  const { tab, setTab } = props;

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
    <Scroll hide smooth>
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
  );
}
