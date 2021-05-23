import React from 'react';
import { TextMeta, Icon } from '@gatsby-tv/components';
import { Transfer } from '@gatsby-tv/icons';
import { FullValue, FullReleaseDate, useIPFSPeers } from '@gatsby-tv/utilities';
import { Video } from '@gatsby-tv/types';

import { Skeleton } from './Title.skeleton';
import styles from './Title.scss';

export interface TitleProps {
  content?: Video;
}

export function Title(props: TitleProps): React.ReactElement {
  const { content } = props;
  const { peers } = useIPFSPeers();

  if (!content) return <Skeleton />;

  return (
    <div className={styles.Title}>
      <TextMeta className={styles.TitleText}>{content.title}</TextMeta>
      <TextMeta.List className={styles.InfoText}>
        <TextMeta>{FullValue(content.views, 'view')}</TextMeta>
        <TextMeta>{FullReleaseDate(content.releaseDate)}</TextMeta>
        <TextMeta className={styles.Peers}>
          <Icon src={Transfer} size="smaller" />
          {FullValue(peers.length, 'peer')}
        </TextMeta>
      </TextMeta.List>
    </div>
  );
}
