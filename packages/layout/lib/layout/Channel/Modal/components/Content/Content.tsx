import { useState, useEffect, FC, ReactElement } from 'react';
import {
  Avatar,
  Image,
  Optional,
  Rule,
  Scroll,
  Tabs,
  TextMeta,
  TextDisplay,
} from '@gatsby-tv/components';
import {
  ChannelHandle,
  FullValue,
  useFrame,
  useComponentWillMount,
} from '@gatsby-tv/utilities';
import { Channel } from '@gatsby-tv/types';

import { Videos } from '@lib/layout/Channel/Videos';
import { Playlists } from '@lib/layout/Channel/Playlists';
import { Shows } from '@lib/layout/Channel/Shows';
import { LinkProps } from '@lib/types';

import { Skeleton } from './Content.skeleton';

import styles from './Content.scss';

export interface ContentProps {
  active?: boolean;
  channel?: Channel;
  link?: FC<LinkProps>;
}

export function Content(props: ContentProps): ReactElement {
  const { active, channel, link: Link } = props;

  const mounted = useComponentWillMount();
  const { screen } = useFrame();
  const [tab, setTab] = useState('videos');

  useEffect(() => {
    if (active) return;
    setTab('videos');
  }, [active]);

  if (!mounted || !channel)
    return <Skeleton tab={tab} setTab={setTab} />;

  const Listing =
    tab === 'videos' ? Videos : tab === 'playlists' ? Playlists : Shows;

  const OverlayMarkup = (
    <div className={styles.Overlay}>
      <div className={styles.Header}>
        <Avatar
          className={styles.Avatar}
          src={channel.avatar}
          size={
            screen.width > 650
              ? 'largest'
              : screen.width > 400
              ? 'larger'
              : 'base'
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
              size={screen.width > 650 ? 'medium' : 'small'}
            >
              {channel.name}
            </TextDisplay.Link>
          </Optional>
          <TextMeta.List className={styles.HeaderInfo}>
            <TextMeta>{ChannelHandle(channel.handle)}</TextMeta>
            <TextMeta>{FullValue(channel.subscribers, 'subscriber')}</TextMeta>
          </TextMeta.List>
        </div>
      </div>
    </div>
  );

  return (
    <Scroll hide smooth>
      <Image src={channel.banner} aspectRatio="2 / 1" overlay={OverlayMarkup} />
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
  );
}
