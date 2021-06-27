import React, { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Rule, Optional } from '@gatsby-tv/components';
import { Video, Channel, useVideo } from '@gatsby-tv/content';
import Player from '@gatsby-tv/player';
import {
  Value,
  useScroll,
  useFrame,
  useIPFSVideoStream,
} from '@gatsby-tv/utilities';

import { Page } from '@src/components/Page';
import { Link } from '@src/components/Link';
import styles from '@src/styles/Video.module.scss';

export default function VideoPage(): React.ReactElement {
  const router = useRouter();
  const {
    screen,
    fullscreen,
    setFullscreen: setFullscreenBase,
    setSidebar,
    setTopbar,
  } = useFrame();
  const { setScroll } = useScroll();
  const { video } = useVideo([router.query.id].flat()[0]);
  const player = useIPFSVideoStream(video?.content);

  const hasCredits = Boolean(
    video?.contributors.length ||
      video?.collaborators.length ||
      video?.sponsors.length
  );

  const setFullscreen = useCallback(
    (value) =>
      setFullscreenBase((current) => {
        const update = typeof value === 'function' ? value(current) : value;
        setTopbar(!update);
        return update;
      }),
    []
  );

  useEffect(() => {
    setSidebar(false);
    setScroll(0);
  }, []);

  useEffect(() => {
    if (fullscreen) {
      setScroll(0);
    }
  }, [fullscreen]);

  const DescriptionMarkup =
    screen.width > 1200 ? (
      <div className={styles.CreditsContainer}>
        <div className={styles.Description}>
          <Channel.Info
            channel={video?.channel}
            avatar={screen.width < 650 ? 'smaller' : 'base'}
            blurb={(channel) => Value(channel.subscribers, 'subscriber')}
            link={Link.Content}
          />
          <Rule spacing={screen.width < 650 ? 'tight' : 'base'} />
          <Video.Description id="description" content={video} />
        </div>
        <Optional
          component="div"
          active={hasCredits}
          $props={{ className: styles.Credits }}
        >
          <Video.Credits content={video} />
        </Optional>
      </div>
    ) : (
      <>
        <Channel.Info
          channel={video?.channel}
          avatar={screen.width < 650 ? 'smaller' : 'base'}
          blurb={(channel) => Value(channel.subscribers, 'subscriber')}
          link={Link.Content}
        />
        <Rule spacing={screen.width < 650 ? 'tight' : 'base'} />
        <Optional
          component="div"
          active={hasCredits}
          $props={{ className: styles.CompactCredits }}
        >
          <Video.CompactCredits content={video} />
        </Optional>
        <Video.Description id="description" content={video} />
      </>
    );

    return (
      <>
        <Player
          ref={player}
          muted
          fullscreen={fullscreen}
          setFullscreen={setFullscreen}
        />
        <Page tight title={video ? `${video.title} - Gatsby` : undefined}>
          <Page.Body>
            <div className={styles.Container}>
              <div className={styles.Info}>
                <Video.Title content={video} />
                <Rule spacing={screen.width < 650 ? 'tight' : 'base'} />
                {DescriptionMarkup}
              </div>
              <div className={styles.Related}>
                <Video.Related
                  video={video}
                  preview={screen.width < 650 ? 'column' : 'row'}
                  avatar={screen.width < 650 ? 'small' : undefined}
                  link={Link.Content}
                />
              </div>
            </div>
          </Page.Body>
        </Page>
      </>
    );
}
