import { ReactElement } from 'react';
import { Injection, Rule, Optional } from '@gatsby-tv/components';
import { Channel, Video } from '@gatsby-tv/content';
import { Value, useFrame, useUniqueId } from '@gatsby-tv/utilities';
import { Video as VideoType } from '@gatsby-tv/types';

import { Link } from '@src/components/Link';

import styles from './Info.module.scss';

export interface InfoProps {
  video?: VideoType;
}

export function Info(props: InfoProps): ReactElement {
  const { video } = props;
  const { screen } = useFrame();

  const id = useUniqueId('video');

  const credits = {
    compact: `compact.credits.${id}`,
    full: `full.credits.${id}`,
  };

  const compact = screen.width < 1200;
  const tight = screen.width < 650;

  const hasCredits =
    video &&
    (video.collaborators.length ||
      video.contributors.length ||
      video.sponsors.length);

  const CreditsInjectionMarkup = hasCredits ? (
    <Injection target={compact ? credits.compact : credits.full}>
      {compact ? (
        <Video.CompactCredits content={video} />
      ) : (
        <Video.Credits content={video} />
      )}
    </Injection>
  ) : null;

  return (
    <div className={styles.Info}>
      <Video.Title content={video} />
      <Rule spacing={tight ? 'tight' : 'base'} />
      <Optional active={!compact} $props={{ className: styles.Container }}>
        <Optional active={!compact} $props={{ className: styles.Description }}>
          <Channel.Info
            channel={video?.channel}
            avatar={tight ? 'smaller' : 'base'}
            blurb={(channel) => Value(channel.subscribers, 'subscriber')}
            link={Link.Content}
          />
          <Rule spacing={tight ? 'tight' : 'base'} />
          <Injection.Target id={credits.compact} className={styles.Credits} />
          <Video.Description content={video} />
        </Optional>
        <Injection.Target id={credits.full} className={styles.Credits} />
      </Optional>
      {CreditsInjectionMarkup}
    </div>
  );
}
