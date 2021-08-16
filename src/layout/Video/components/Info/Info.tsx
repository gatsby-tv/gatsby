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

  const id = useUniqueId('credits');
  const credits = {
    compact: `compact.${id}`,
    full: id,
  };

  const compact = screen.width < 1200;
  const tight = screen.width < 650;

  const CreditsMarkup = compact ? (
    <Video.CompactCredits content={video} />
  ) : (
    <Video.Credits content={video} />
  );

  const CreditsInjectionMarkup = CreditsMarkup ? (
    <Injection target={compact ? credits.compact : credits.full}>
      {CreditsMarkup}
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
          <Video.Description id="description" content={video} />
        </Optional>
        <Injection.Target id={credits.full} className={styles.Credits} />
      </Optional>
      {CreditsInjectionMarkup}
    </div>
  );
}
